"use client";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useConfirm } from "~/hooks/use-confirm";
import { useDeleteCategoryMutation } from "~/apis/category/queries";
import { useOpenCategory } from "~/features/category/hooks/use-open-category";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this category."
  );
  const deleteMutation = useDeleteCategoryMutation();
  const { onOpen } = useOpenCategory();

  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          console.log("delete success");
        },
        onError: () => {
          console.log("delete error");
        },
      });
    }
  };

  return (
    <>
      <ConfirmationDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={() => onOpen(id)}
          >
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
          >
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
