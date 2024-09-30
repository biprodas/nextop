import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { useNewProgram } from "../hooks/use-new-program";
import { useCreateProgramMutation } from "../apis/queries";
import { ProgramForm } from "./program-form";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  note: z.string().optional(),
});

type FormValues = z.input<typeof formSchema>;

export const NewProgramSheet = () => {
  const { isOpen, onClose } = useNewProgram();

  const mutation = useCreateProgramMutation();

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
          <SheetTitle>New Program</SheetTitle>
          <SheetDescription>Create your desired program</SheetDescription>
        </SheetHeader>
        <ProgramForm
          onSubmit={onSubmit}
          loading={mutation.isPending}
          disabled={mutation.isPending}
          defaultValues={{
            name: "",
            note: "",
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
