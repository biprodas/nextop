import { ReactNode } from "react";
import toast from "react-hot-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { useDeleteCategory } from "../hooks/use-delete-category";
import { useDeleteCategoryMutation } from "../api/queries";

interface DeleteModalProps {
  // isOpen: boolean;
  // loading: boolean;
  // onConfirm: () => void;
  // onClose: () => void;
  title?: string;
  description?: string;
  confirmBtnLabel?: string;
  cancelBtnLabel?: string;
  trigger?: ReactNode;
}

const DeleteCategoryModal = ({
  title = "Delete",
  description = "Are you sure ?",
  confirmBtnLabel = "Delete",
  cancelBtnLabel = "Cancel",
}: DeleteModalProps) => {
  const categoryModal = useDeleteCategory();

  const { mutateAsync: deleteCategory, isPending } =
    useDeleteCategoryMutation();

  const handleClose = () => {
    categoryModal.onClose();
  };

  const handleConfirm = async () => {
    try {
      await deleteCategory(categoryModal.id ?? "");
      categoryModal.onClose();
      toast.success(`Category removed!`);
    } catch (error) {
      toast.error("Error occured");
    }
  };

  return (
    <AlertDialog
      open={categoryModal.isOpen}
      onOpenChange={categoryModal.onClose}
    >
      {/* {trigger && <AlertDialogTrigger>{trigger}</AlertDialogTrigger>} */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>{description}</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose} disabled={isPending}>
            {cancelBtnLabel}
          </AlertDialogCancel>
          {/* <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction> */}
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {confirmBtnLabel}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCategoryModal;
