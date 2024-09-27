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
import {
  useAddCountryMutation,
  useUpdateCountryMutation,
} from "~/apis/country/queries";
import { LuLoader2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useCountryModal } from "~/hooks/use-country-modal";
import DeleteCountryModal from "./delete-country";

export function AddCountry() {
  const countryModal = useCountryModal();

  const { mutateAsync: addCountry, isPending: isCreating } =
    useAddCountryMutation();
  const { mutateAsync: updateCountry, isPending: isUpdating } =
    useUpdateCountryMutation();

  const isLoading = isCreating || isUpdating;

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

  useEffect(() => {
    // console.log("add country", data);
    form.reset({
      name: countryModal.data?.name || "",
      alpha2: countryModal.data?.alpha2 || "",
      alpha3: countryModal.data?.alpha3 || "",
      code: countryModal.data?.code || "",
      phone: countryModal.data?.phone || "",
      capital: countryModal.data?.capital || "",
    });
  }, [countryModal, form]);

  const handleClose = () => {
    console.log("handleClose called");
    form.reset();
  };

  const onSubmit = async (values: z.infer<typeof CountrySchema>) => {
    console.log("values", values);
    const result =
      countryModal.open === "edit"
        ? await updateCountry({ ...values, id: countryModal.data?.id || "" })
        : await addCountry(values);
    console.log("result", result);
    countryModal.onClose();
  };

  if (countryModal.open === "view") return <span>View Modal</span>;
  if (countryModal.open === "delete") return <DeleteCountryModal />;

  return (
    <Sheet open={countryModal.isOpen} onOpenChange={countryModal.onOpenChange}>
      {!countryModal.data && (
        <SheetTrigger asChild>
          <Button className="rounded-full">
            <FaPlus size={12} className="me-1" />
            <span>Add New</span>
          </Button>
        </SheetTrigger>
      )}
      <SheetContent className="sm:max-w-[450px]">
        <SheetHeader>
          <SheetTitle>
            {countryModal.open === "edit" ? "Edit Country" : "Add Country"}
          </SheetTitle>
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
                  <Button
                    variant="outline"
                    className="w-24"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </SheetClose>
                <Button type="submit" disabled={isLoading} className="w-min-24">
                  <span>
                    {countryModal.open === "edit" ? "Save Changes" : "Save"}
                  </span>
                  {isLoading && <LuLoader2 className="ml-2 animate-spin" />}
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
