import { ReactNode } from "react";
import toast from "react-hot-toast";
import { LuLoaderCircle } from "react-icons/lu";

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
import { useDeleteCountryMutation } from "~/features/country/api/queries";
import { useCountryModal } from "~/hooks/use-country-modal";

interface DeleteModalProps {
  isOpen: boolean;
  loading: boolean;
  onConfirm: () => void;
  onClose: () => void;
  trigger: ReactNode;
}

const DeleteCountryModal = () => {
  const countryModal = useCountryModal();

  const { mutateAsync: deleteCountry, isPending } = useDeleteCountryMutation();

  const handleClose = () => {
    countryModal.onClose();
  };

  const handleConfirm = async () => {
    try {
      await deleteCountry(countryModal.data?.id ?? "");
      countryModal.onClose();
      toast.success(`Country removed!`);
    } catch (error) {
      toast.error("Error occured");
    }
  };

  return (
    <AlertDialog open={countryModal.open === "delete"}>
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
          <AlertDialogCancel onClick={handleClose} disabled={isPending}>
            Cancel
          </AlertDialogCancel>
          {/* <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction> */}
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isPending}
          >
            <span>Delete</span>
            {isPending && <LuLoaderCircle className="ml-2 animate-spin" />}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCountryModal;
