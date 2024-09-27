import { Loader2 } from "lucide-react";
import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { useGetStateQuery, useUpdateStateMutation } from "../apis/queries";
import { useOpenState } from "../hooks/use-open-state";
import { StateForm } from "./state-form";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  countryId: z.string().min(1, {
    message: "Country is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export const EditStateSheet = () => {
  const { isOpen, onClose, id } = useOpenState();

  const stateQuery = useGetStateQuery(id);
  const editMutation = useUpdateStateMutation();

  const defaultValues = {
    name: stateQuery.data?.data.name || "",
    countryId: stateQuery.data?.data.countryId || "",
  };

  const isLoading = stateQuery.isLoading;

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
          <SheetTitle>Edit State</SheetTitle>

          <SheetDescription>Edit an existing state.</SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <StateForm
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
