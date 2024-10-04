import { Loader2 } from "lucide-react";
import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import {
  useGetProfessorQuery,
  useUpdateProfessorMutation,
} from "../apis/queries";
import { useOpenProfessor } from "../hooks/use-open-professor";
import { ProfessorForm } from "./professor-form";

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

type FormValues = z.infer<typeof formSchema>;

export const EditProfessorSheet = () => {
  const { isOpen, onClose, id } = useOpenProfessor();

  const professorQuery = useGetProfessorQuery(id);
  const editMutation = useUpdateProfessorMutation();

  const defaultValues = {
    name: professorQuery.data?.data.name || "",
    email: professorQuery.data?.data.email || "",
    website: professorQuery.data?.data.website || "",
    details: professorQuery.data?.data.details || "",
    universityId: professorQuery.data?.data.universityId || "",
    departmentId: professorQuery.data?.data.departmentId || "",
  };

  const isLoading = professorQuery.isLoading;

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
      <SheetContent className="sm:max-w-[450px] space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Professor</SheetTitle>

          <SheetDescription>Edit an existing professor.</SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <ProfessorForm
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
