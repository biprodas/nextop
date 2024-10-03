import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LuLoader2 } from "react-icons/lu";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { useGetCountriesQuery } from "~/features/country/api/queries";
import { useGetStatesQuery } from "~/features/state/apis/queries";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  acronym: z.string().optional(),
  type: z.string().optional(),
  website: z.string().optional(),
  ranking: z.string().optional(),
  details: z.string().optional(),
  countryId: z.string().min(1, {
    message: "Country is required",
  }),
  stateId: z.string().optional(),
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export const UniversityForm = ({
  id,
  defaultValues,
  onSubmit,
  loading,
  disabled,
}: Props) => {
  const { data: country, isLoading: isCountryLoading } = useGetCountriesQuery();
  const { data: state, isLoading: isStatesLoading } = useGetStatesQuery();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-5 py-5"
      >
        <div className="flex gap-3">
          <div className="flex-1">
            <FormField
              name="countryId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div>
                    <Label htmlFor={field.name} className="mb-2">
                      Country <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={disabled}
                        >
                          <SelectTrigger className="">
                            {/* <SelectValue placeholder="Select Country" /> */}
                            <SelectValue
                              placeholder={
                                isCountryLoading
                                  ? "Loading..."
                                  : "Select Country"
                              }
                            />
                            {isCountryLoading && (
                              <LuLoader2 className="size-4 animate-spin" />
                            )}
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Countries</SelectLabel>
                              {(country?.data || []).map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="absolute" />
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              name="stateId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div>
                    <Label htmlFor={field.name} className="mb-2">
                      State
                    </Label>
                    <div className="relative">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={disabled}
                        >
                          <SelectTrigger className="">
                            {/* <SelectValue placeholder="Select Country" /> */}
                            <SelectValue
                              placeholder={
                                isStatesLoading ? "Loading..." : "Select State"
                              }
                            />
                            {isStatesLoading && (
                              <LuLoader2 className="size-4 animate-spin" />
                            )}
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Countries</SelectLabel>
                              {(state?.data || []).map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="absolute" />
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div>
                <Label htmlFor={field.name} className="mb-2">
                  University Name <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      disabled={disabled}
                      placeholder="Enter university name"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <div className="flex-1">
            <FormField
              name="acronym"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div>
                    <Label htmlFor={field.name} className="mb-2">
                      Short Name
                    </Label>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          id={field.name}
                          disabled={disabled}
                          placeholder="Enter short name"
                        />
                      </FormControl>
                      <FormMessage className="absolute" />
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div>
                    <Label htmlFor={field.name} className="mb-2">
                      Type
                    </Label>
                    <div className="relative">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={disabled}
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Countries</SelectLabel>
                              {["Public", "Private"].map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="absolute" />
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="basis-1/3">
            <FormField
              name="website"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div>
                    <Label htmlFor={field.name} className="mb-2">
                      Website
                    </Label>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          id={field.name}
                          disabled={disabled}
                          placeholder="Enter web url"
                        />
                      </FormControl>
                      <FormMessage className="absolute" />
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="basis-1/4">
            <FormField
              name="ranking"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div>
                    <Label htmlFor={field.name} className="mb-2">
                      Ranking
                    </Label>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          id={field.name}
                          disabled={disabled}
                          placeholder="Enter web url"
                        />
                      </FormControl>
                      <FormMessage className="absolute" />
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          name="details"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div>
                <Label htmlFor={field.name} className="mb-2">
                  Details
                </Label>
                <div className="relative">
                  <FormControl>
                    <Textarea
                      {...field}
                      id={field.name}
                      disabled={disabled}
                      placeholder="Enter details"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={disabled}>
          {id ? "Save changes" : "Create University"}
        </Button>
      </form>
    </Form>
  );
};
