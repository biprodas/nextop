import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { useNewProfessor } from "../hooks/use-new-professor";
import { useCreateProfessorMutation } from "../apis/queries";
import { ProfessorForm } from "./professor-form";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().min(1, {
    message: "Email is required",
  }),
});

type FormValues = z.input<typeof formSchema>;

export const NewProfessorSheet = () => {
  const { isOpen, onClose } = useNewProfessor();

  const mutation = useCreateProfessorMutation();

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
          <SheetTitle>New Professor</SheetTitle>
          <SheetDescription>
            Create a professor tour next destination.
          </SheetDescription>
        </SheetHeader>
        <ProfessorForm
          onSubmit={onSubmit}
          loading={mutation.isPending}
          disabled={mutation.isPending}
          defaultValues={{
            name: "",
            email: "",
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
