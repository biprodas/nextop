import { ReactNode } from "react";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { useDeleteDepartment } from "../hooks/use-delete-department";
import { useDeleteDepartmentMutation } from "../apis/queries";

interface DeleteModalProps {
  title?: string;
  description?: string;
  confirmBtnLabel?: string;
  cancelBtnLabel?: string;
  trigger?: ReactNode;
}

const DeleteDepartmentDialog = ({
  title = "Delete",
  description = "Are you sure ?",
  confirmBtnLabel = "Delete",
  cancelBtnLabel = "Cancel",
}: DeleteModalProps) => {
  const departmentModal = useDeleteDepartment();

  const { mutateAsync: deleteDepartment, isPending } =
    useDeleteDepartmentMutation();

  const handleClose = () => {
    departmentModal.onClose();
  };

  const handleConfirm = async () => {
    try {
      await deleteDepartment(departmentModal.id ?? "");
      departmentModal.onClose();
      toast.success(`Department removed!`);
    } catch (error) {
      toast.error("Error occured");
    }
  };

  return (
    <AlertDialog
      open={departmentModal.isOpen}
      onOpenChange={departmentModal.onClose}
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

export default DeleteDepartmentDialog;
