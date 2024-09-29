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
  useGetDepartmentQuery,
  useUpdateDepartmentMutation,
} from "../apis/queries";
import { useOpenDepartment } from "../hooks/use-open-department";
import { DepartmentForm } from "./department-form";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  acronym: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const EditDepartmentSheet = () => {
  const { isOpen, onClose, id } = useOpenDepartment();

  const departmentQuery = useGetDepartmentQuery(id);
  const editMutation = useUpdateDepartmentMutation();

  const defaultValues = {
    name: departmentQuery.data?.data.name || "",
    acronym: departmentQuery.data?.data.acronym || "",
  };

  const isLoading = departmentQuery.isLoading;

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
          <SheetTitle>Edit Department</SheetTitle>

          <SheetDescription>Edit an existing department.</SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <DepartmentForm
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
