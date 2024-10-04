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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor={field.name} className="col-span-1 text-right">
                  Name <span className="text-red-400">*</span>
                </Label>
                <div className="col-span-3 relative">
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Enter university name"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acronym"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor={field.name} className="col-span-1 text-right">
                  Short Name
                </Label>
                <div className="col-span-3 relative">
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Enter short name"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor={field.name} className="col-span-1 text-right">
                  Website
                </Label>
                <div className="col-span-3 relative">
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Enter website url"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor={field.name} className="col-span-1 text-right">
                  Type
                </Label>
                <div className="col-span-3 relative">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={disabled}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
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

        {/* <FormField
          control={form.control}
          name="ranking"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor={field.name} className="col-span-1 text-right">
                  Ranking
                </Label>
                <div className="col-span-3 relative">
                  <FormControl>
                    <Input
                      placeholder="Enter ranking"
                      id={field.name}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor={field.name} className="col-span-1 text-right">
                  Details
                </Label>
                <div className="col-span-3 relative">
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Enter details"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="countryId"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor={field.name} className="col-span-1 text-right">
                  Country <span className="text-red-400">*</span>
                </Label>
                <div className="col-span-3 relative">
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
                            isCountryLoading ? "Loading..." : "Select Country"
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

        <FormField
          control={form.control}
          name="stateId"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor={field.name} className="col-span-1 text-right">
                  State
                </Label>
                <div className="col-span-3 relative">
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

        <div className="flex justify-end gap-3">
          {/* <Button variant="outline" className="w-24" disabled={loading}>
            Cancel
          </Button> */}
          <Button type="submit" disabled={loading} className="w-min-24">
            {id ? "Save changes" : "Create University"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
