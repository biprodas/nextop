import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { useNewUniversity } from "../hooks/use-new-university";
import { useCreateUniversityMutation } from "../apis/queries";
import { UniversityForm } from "./university-form";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  acronym: z.string().optional(),
  type: z.string().optional(),
  website: z.string().optional(),
  ranking: z.string().optional(),
  details: z.string().optional(),
  countryId: z.string().min(1, {
    message: "Country is required",
  }),
  stateId: z.string().optional(),
});

type FormValues = z.input<typeof formSchema>;

export const NewUniversitySheet = () => {
  const { isOpen, onClose } = useNewUniversity();

  const mutation = useCreateUniversityMutation();

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
      <SheetContent className="sm:max-w-[450px] space-y-4">
        <SheetHeader>
          <SheetTitle>New University</SheetTitle>
          <SheetDescription>
            Create a university tour next destination.
          </SheetDescription>
        </SheetHeader>
        <UniversityForm
          onSubmit={onSubmit}
          loading={mutation.isPending}
          disabled={mutation.isPending}
          defaultValues={{
            name: "",
            acronym: "",
            type: "",
            website: "",
            ranking: "",
            details: "",
            countryId: "",
            stateId: "",
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
