"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { CountrySchema } from "~/schemas/country";
import { FaPlus } from "react-icons/fa6";

export function AddCountry() {
  const isNew = true;

  const form = useForm<z.infer<typeof CountrySchema>>({
    resolver: zodResolver(CountrySchema),
    defaultValues: {
      name: "",
      alpha2: "",
      alpha3: "",
      code: "",
      phone: "",
      capital: "",
      // flag: "",
    },
  });

  const handleClose = () => {
    console.log("handleClose called");
    form.reset();
  };

  const onSubmit = (values: z.infer<typeof CountrySchema>) => {
    console.log("values", values);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="rounded-full">
          <FaPlus size={12} className="me-1" /> <span>Add New</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[450px]">
        <SheetHeader>
          <SheetTitle>{isNew ? "Add New Country" : "Edit Country"}</SheetTitle>
          <SheetDescription>
            Enter country details here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="py-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-3">
                      <Label
                        htmlFor={field.name}
                        className="col-span-1 text-right"
                      >
                        Name <span className="text-red-400">*</span>
                      </Label>
                      <div className="col-span-3 relative">
                        <FormControl>
                          <Input
                            placeholder="Enter country name"
                            id={field.name}
                            {...field}
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
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-3">
                      <Label
                        htmlFor={field.name}
                        className="col-span-1 text-right"
                      >
                        Country Code
                      </Label>
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            placeholder="Enter country code"
                            id={field.name}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alpha2"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-3">
                      <Label
                        htmlFor={field.name}
                        className="col-span-1 text-right"
                      >
                        Alpha 2
                      </Label>
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            placeholder="Enter alpha2 code"
                            id={field.name}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alpha3"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-3">
                      <Label
                        htmlFor={field.name}
                        className="col-span-1 text-right"
                      >
                        Alpha 3
                      </Label>
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            placeholder="Enter alpha3 code"
                            id={field.name}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-3">
                      <Label
                        htmlFor={field.name}
                        className="col-span-1 text-right"
                      >
                        Calling Code
                      </Label>
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            placeholder="Enter country dialing code"
                            id={field.name}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capital"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-3">
                      <Label
                        htmlFor={field.name}
                        className="col-span-1 text-right"
                      >
                        Capital Name
                      </Label>
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            placeholder="Enter capital name"
                            id={field.name}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline" onClick={handleClose}>
                    Cancel
                  </Button>
                </SheetClose>
                <Button type="submit">
                  {isNew ? "Create" : "Save changes"}
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
