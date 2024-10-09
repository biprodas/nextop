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
import { useGetDepartmentsQuery } from "~/features/department/apis/queries";
import { useGetUniversitiesQuery } from "~/features/university/apis/queries";
import { ProgramSchema as formSchema } from "../apis/schema";

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export const ProgramForm = ({
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
        className="space-y-4 py-5 px-px"
      >
        {/* <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div>
                <Label htmlFor={field.name}>
                  Name <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      disabled={disabled}
                      placeholder="Enter name"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        /> */}

        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-4">
            <FormField
              name="degree"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div>
                    <Label htmlFor={field.name} className="">
                      Program Name <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={disabled}
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="Select Program" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {["M.Sc", "PhD"].map((item) => (
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
          <div className="col-span-8">
            <FormField
              name="subject"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div>
                    <Label htmlFor={field.name}>
                      Subject / Area of Study
                      <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={disabled}
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="Select Subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {[
                                "Computer Science",
                                "Software Engineering",
                                "Cyber Security",
                              ].map((item) => (
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

        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-7">
            <FormField
              name="universityId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div>
                    <Label htmlFor={field.name}>
                      University <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
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
                              <LuLoader2 className="size-4 animate-spin" />
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
          </div>
          <div className="col-span-5">
            <FormField
              name="departmentId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div>
                    <Label htmlFor={field.name}>Department</Label>
                    <div className="relative">
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
                              <LuLoader2 className="size-4 animate-spin" />
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
          </div>
        </div>

        <FormField
          name="gre"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div>
                <Label htmlFor={field.name}>GRE</Label>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      id={field.name}
                      disabled={disabled}
                      placeholder="Enter"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <div className="flex-1">
            <FormField
              name="ielts"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div>
                    <Label htmlFor={field.name}>IELTS</Label>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          id={field.name}
                          disabled={disabled}
                          placeholder="Enter"
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
              name="toefl"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div>
                    <Label htmlFor={field.name}>TOEFL</Label>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          id={field.name}
                          disabled={disabled}
                          placeholder="Enter"
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
              name="duolingo"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div>
                    <Label htmlFor={field.name}>DUOLINGO</Label>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          id={field.name}
                          disabled={disabled}
                          placeholder="Enter"
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
              name="pte"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div>
                    <Label htmlFor={field.name}>PTE</Label>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          id={field.name}
                          disabled={disabled}
                          placeholder="Enter"
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

        <div className="grid grid-cols-3 gap-2">
          <FormField
            name="session"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div>
                  <Label htmlFor={field.name} className="">
                    Session
                  </Label>
                  <div className="relative">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={disabled}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select Session" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {["Fall", "Spring", "Summer"].map((item) => (
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
          <FormField
            name="priorityDate"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div>
                  <Label htmlFor={field.name}>Priority Date</Label>
                  <div className="relative">
                    <FormControl>
                      <Input
                        {...field}
                        id={field.name}
                        disabled={disabled}
                        placeholder="Enter"
                      />
                    </FormControl>
                    <FormMessage className="absolute" />
                  </div>
                </div>
              </FormItem>
            )}
          />
          <FormField
            name="endDate"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div>
                  <Label htmlFor={field.name}>Deadline</Label>
                  <div className="relative">
                    <FormControl>
                      <Input
                        {...field}
                        id={field.name}
                        disabled={disabled}
                        placeholder="Enter"
                      />
                    </FormControl>
                    <FormMessage className="absolute" />
                  </div>
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="note"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div>
                <Label htmlFor={field.name} className="mb-2">
                  Note
                </Label>
                <div className="relative">
                  <FormControl>
                    <Textarea
                      rows={1}
                      {...field}
                      id={field.name}
                      disabled={disabled}
                      placeholder="Write your notes/remarks here"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={disabled}>
          {id ? "Save changes" : "Create Program"}
        </Button>
      </form>
    </Form>
  );
};
