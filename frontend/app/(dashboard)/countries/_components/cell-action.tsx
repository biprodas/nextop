"use client";

import { CopyIcon, EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ICountry } from "~/features/country/api/dto";
import { useCountryModal } from "~/hooks/use-country-modal";

interface CellActionProps {
  data: ICountry;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const countryModal = useCountryModal();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Country ID copied to the clipboard.");
  };

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      /> */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <CopyIcon />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => countryModal.onOpen("edit", data)}>
            <EditIcon />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => countryModal.onOpen("delete", data)}>
            <TrashIcon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
