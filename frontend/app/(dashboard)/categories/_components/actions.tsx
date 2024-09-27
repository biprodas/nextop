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
import { useConfirmDialog } from "~/hooks/use-confirm-dialog";
import { ConfirmDialog } from "~/components/modals/confirm-dialog";
import { useConfirmStore } from "~/hooks/use-confirm-store";
import toast from "react-hot-toast";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenCategory();

  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this category."
  );
  const deleteMutation = useDeleteCategoryMutation();

  const { openConfirm } = useConfirmStore();

  const handleDeleteClick = () => {
    openConfirm(async () => {
      // await deleteCategory(id);
      // toast.success("Category deleted successfully");
      deleteMutation.mutate(id, {
        onSuccess: () => {
          toast.success("Category deleted successfully");
          console.log("Category deleted successfully");
        },
        onError: (error) => {
          console.error("Failed to delete category:", error);
        },
      });
    });
  };

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
      {/* <ConfirmationDialog /> */}
      <ConfirmDialog loading={deleteMutation.isPending} />
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
            onClick={handleDeleteClick}
          >
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
