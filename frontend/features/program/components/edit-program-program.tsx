import { Loader2 } from "lucide-react";
import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { useGetProgramQuery, useUpdateProgramMutation } from "../apis/queries";
import { useOpenProgram } from "../hooks/use-open-program";
import { ProgramForm } from "./program-form";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  countryId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const EditProgramSheet = () => {
  const { isOpen, onClose, id } = useOpenProgram();

  const programQuery = useGetProgramQuery(id);
  const editMutation = useUpdateProgramMutation();

  const defaultValues = {
    name: programQuery.data?.data.name || "",
    note: programQuery.data?.data.note || "",
  };

  const isLoading = programQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    console.log("values", values);
    editMutation.mutate(
      { ...values, id },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Program</SheetTitle>

          <SheetDescription>Edit an existing program.</SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <ProgramForm
            id={id}
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            disabled={editMutation.isPending}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
