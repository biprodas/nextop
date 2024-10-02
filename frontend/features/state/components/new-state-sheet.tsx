import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { useNewState } from "../hooks/use-new-state";
import { useCreateStateMutation } from "../apis/queries";
import { StateForm } from "./state-form";

export const formSchema = z.object({
  countryId: z.string().min(1, {
    message: "Country is required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  acronym: z.string().optional(),
});

type FormValues = z.input<typeof formSchema>;

export const NewStateSheet = () => {
  const { isOpen, onClose } = useNewState();

  const mutation = useCreateStateMutation();

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
          <SheetTitle>New State</SheetTitle>
          <SheetDescription>
            Create a state tour next destination.
          </SheetDescription>
        </SheetHeader>
        <StateForm
          onSubmit={onSubmit}
          loading={mutation.isPending}
          disabled={mutation.isPending}
          defaultValues={{
            name: "",
            acronym: undefined,
            countryId: "",
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
