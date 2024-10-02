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

export const formSchema = z.object({
  countryId: z.string().min(1, {
    message: "Country is required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  acronym: z.string().optional(),
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

export const StateForm = ({
  id,
  defaultValues,
  onSubmit,
  loading,
  disabled,
}: Props) => {
  const { data: country, isLoading } = useGetCountriesQuery();

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
        className="space-y-6 py-5"
      >
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
                            isLoading ? "Loading..." : "Select Country"
                          }
                        />
                        {isLoading && (
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
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div>
                <Label htmlFor={field.name} className="mb-2">
                  State/Region Name <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      disabled={disabled}
                      placeholder="Enter state name"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

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
                      placeholder="Enter acronym / abbreviation"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={disabled}>
          {id ? "Save changes" : "Create State"}
        </Button>
      </form>
    </Form>
  );
};
