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
import { useDeleteStateMutation } from "../apis/queries";
import { useDeleteState } from "../hooks/use-delete-state";

interface DeleteModalProps {
  title?: string;
  description?: string;
  confirmBtnLabel?: string;
  cancelBtnLabel?: string;
  trigger?: ReactNode;
}

const DeleteStateDialog = ({
  title = "Delete",
  description = "Are you sure ?",
  confirmBtnLabel = "Delete",
  cancelBtnLabel = "Cancel",
}: DeleteModalProps) => {
  const stateModal = useDeleteState();

  const { mutateAsync: deleteState, isPending } = useDeleteStateMutation();

  const handleClose = () => {
    stateModal.onClose();
  };

  const handleConfirm = async () => {
    try {
      await deleteState(stateModal.id ?? "");
      stateModal.onClose();
      toast.success(`State removed!`);
    } catch (error) {
      toast.error("Error occured");
    }
  };

  return (
    <AlertDialog open={stateModal.isOpen} onOpenChange={stateModal.onClose}>
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

export default DeleteStateDialog;
