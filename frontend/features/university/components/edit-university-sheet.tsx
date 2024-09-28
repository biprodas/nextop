import { Loader2 } from "lucide-react";
import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { useOpenUniversity } from "../hooks/use-open-university";
import {
  useGetUniversityQuery,
  useUpdateUniversityMutation,
} from "../apis/queries";
import { UniversityForm } from "./university-form";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  countryId: z.string().min(1, {
    message: "Country is required",
  }),
  stateId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const EditUniversitySheet = () => {
  const { isOpen, onClose, id } = useOpenUniversity();

  const universityQuery = useGetUniversityQuery(id);
  const editMutation = useUpdateUniversityMutation();

  const defaultValues = {
    name: universityQuery.data?.data.name || "",
    countryId: universityQuery.data?.data.countryId || "",
  };

  const isLoading = universityQuery.isLoading;

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
          <SheetTitle>Edit University</SheetTitle>

          <SheetDescription>Edit an existing university.</SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <UniversityForm
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
