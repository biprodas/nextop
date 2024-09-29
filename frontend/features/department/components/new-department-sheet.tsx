import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { useNewDepartment } from "../hooks/use-new-department";
import { useCreateDepartmentMutation } from "../apis/queries";
import { DepartmentForm } from "./department-form";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  acronym: z.string().optional(),
});

type FormValues = z.input<typeof formSchema>;

export const NewDepartmentSheet = () => {
  const { isOpen, onClose } = useNewDepartment();

  const mutation = useCreateDepartmentMutation();

  const onSubmit = (values: FormValues) => {
    console.log("values", values);
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Department</SheetTitle>
          <SheetDescription>
            Create a department tour next destination.
          </SheetDescription>
        </SheetHeader>
        <DepartmentForm
          onSubmit={onSubmit}
          loading={mutation.isPending}
          disabled={mutation.isPending}
          defaultValues={{
            name: "",
            acronym: "",
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
