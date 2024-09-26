import { ReactNode } from "react";
import { LuLoader2 } from "react-icons/lu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";

interface DeleteModalProps {
  isOpen: boolean;
  loading: boolean;
  onConfirm: () => void;
  onClose: () => void;
  // trigger: ReactNode;
}

const DeleteCountryModal = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
}: DeleteModalProps) => {
  return (
    <AlertDialog open={isOpen}>
      {/* {trigger && <AlertDialogTrigger>{trigger}</AlertDialogTrigger>} */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Country</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            country and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose} disabled={loading}>
            Cancel
          </AlertDialogCancel>
          {/* <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction> */}
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            <span>Delete</span>
            {loading && <LuLoader2 className="ml-2 animate-spin" />}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCountryModal;
