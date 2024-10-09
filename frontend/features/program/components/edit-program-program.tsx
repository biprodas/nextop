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

import { ProgramSchema as formSchema } from "../apis/schema";

type FormValues = z.infer<typeof formSchema>;

export const EditProgramSheet = () => {
  const { isOpen, onClose, id } = useOpenProgram();

  const programQuery = useGetProgramQuery(id);
  const editMutation = useUpdateProgramMutation();

  const defaultValues = {
    name: programQuery.data?.data.name || "",
    degree: programQuery.data?.data.degree || "",
    subject: programQuery.data?.data.subject || "",
    departmentId: programQuery.data?.data.departmentId || "",
    universityId: programQuery.data?.data.universityId || "",
    session: programQuery.data?.data.session || "",
    year: programQuery.data?.data.year || "",
    priority: programQuery.data?.data.priority || "",
    ielts: programQuery.data?.data.ielts || "",
    toefl: programQuery.data?.data.toefl || "",
    duolingo: programQuery.data?.data.duolingo || "",
    pte: programQuery.data?.data.pte || "",
    priorityDate: programQuery.data?.data.priorityDate || "",
    endDate: programQuery.data?.data.endDate || "",
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
      <SheetContent className="space-y-4 sm:max-w-[450px] ">
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
