import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { useNewCategory } from "../hooks/use-new-category";
import { CategoryForm } from "./category-form";
import { useCreateCategoryMutation } from "../api/queries";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Category name is required",
  }),
  description: z.string().optional(),
});

type FormValues = z.input<typeof formSchema>;

export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();

  const mutation = useCreateCategoryMutation();

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
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new category to organize your data.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          loading={mutation.isPending}
          disabled={mutation.isPending}
          defaultValues={{
            name: "",
            description: "",
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
