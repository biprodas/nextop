import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LuLoaderCircle } from "react-icons/lu";
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
import { useGetDepartmentsQuery } from "~/features/department/apis/queries";
import { useGetUniversitiesQuery } from "~/features/university/apis/queries";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().min(1, {
    message: "Email is required",
  }),
  website: z.string().optional(),
  details: z.string().optional(),
  universityId: z.string().optional(),
  departmentId: z.string().optional(),
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

export const ProfessorForm = ({
  id,
  defaultValues,
  onSubmit,
  loading,
  disabled,
}: Props) => {
  const { data: university, isLoading: isUniversityLoading } =
    useGetUniversitiesQuery();
  const { data: department, isLoading: isDepartmentLoading } =
    useGetDepartmentsQuery();

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
                      placeholder="Enter professor name"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor={field.name} className="col-span-1 text-right">
                  Email <span className="text-red-400">*</span>
                </Label>
                <div className="col-span-3 relative">
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Enter email"
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
          name="details"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor={field.name} className="col-span-1 text-right">
                  Details
                </Label>
                <div className="col-span-3 relative">
                  <FormControl>
                    <Textarea
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
          name="universityId"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor={field.name} className="col-span-1 text-right">
                  University
                </Label>
                <div className="col-span-3 relative">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={disabled}
                    >
                      <SelectTrigger className="">
                        <SelectValue
                          placeholder={
                            isUniversityLoading
                              ? "Loading..."
                              : "Select University"
                          }
                        />
                        {isUniversityLoading && (
                          <LuLoaderCircle className="size-4 animate-spin" />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Universities</SelectLabel>
                          {(university?.data || []).map((item) => (
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
          name="departmentId"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor={field.name} className="col-span-1 text-right">
                  Department
                </Label>
                <div className="col-span-3 relative">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={disabled}
                    >
                      <SelectTrigger className="">
                        <SelectValue
                          placeholder={
                            isDepartmentLoading
                              ? "Loading..."
                              : "Select Department"
                          }
                        />
                        {isDepartmentLoading && (
                          <LuLoaderCircle className="size-4 animate-spin" />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Departments</SelectLabel>
                          {(department?.data || []).map((item) => (
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

        <div className="flex justify-end">
          <Button type="submit" disabled={loading} className="w-min-24">
            {id ? "Save changes" : "Add Professor"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
