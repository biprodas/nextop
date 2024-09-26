"use client";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
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
import { AlertModal } from "~/components/modals/alert-modal";
import { ICountry } from "~/apis/country/dto";
import DeleteCountryModal from "./delete-country";
import { useDeleteCountryMutation } from "~/apis/country/queries";
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
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="size-4 mr-2" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => countryModal.onOpen("edit", data)}>
            <Edit className="size-4 mr-2" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => countryModal.onOpen("delete", data)}>
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
