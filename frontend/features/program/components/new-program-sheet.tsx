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
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { ProgramSchema as formSchema } from "../apis/schema";

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
      <SheetContent style={{ maxWidth: "50vw" }}>
        <SheetHeader>
          <SheetTitle>New Program</SheetTitle>
          <SheetDescription>Create your desired program</SheetDescription>
        </SheetHeader>
        {/* <ScrollArea className="h-[500px] pe-3"> */}
        <ProgramForm
          onSubmit={onSubmit}
          loading={mutation.isPending}
          disabled={mutation.isPending}
          defaultValues={{
            degree: "",
            subject: "",
            departmentId: "",
            universityId: "",
            session: "",
            year: "",
            priority: "",
            gre: "",
            ielts: "",
            toefl: "",
            duolingo: "",
            pte: "",
            priorityDate: "",
            endDate: "",
            note: "",
          }}
        />
        {/* </ScrollArea> */}
      </SheetContent>
    </Sheet>
  );
};
