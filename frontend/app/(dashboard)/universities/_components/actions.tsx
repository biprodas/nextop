"use client";

import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import DeleteUniversityDialog from "~/features/university/components/delete-university-dialog";
import { useDeleteUniversity } from "~/features/university/hooks/use-delete-university";
import { useOpenUniversity } from "~/features/university/hooks/use-open-university";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenUniversity();
  const universityModal = useDeleteUniversity();

  return (
    <>
      <DeleteUniversityDialog
        title="Delete University"
        description="Are you to delete this university? This will permanently remove from our servers. This action cannot be undone."
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onOpen(id)}>
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => universityModal.onOpen(id)}>
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
