"use client";

import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import DeleteDepartmentDialog from "~/features/department/components/delete-department-dialog";
import { useDeleteDepartment } from "~/features/department/hooks/use-delete-department";
import { useOpenDepartment } from "~/features/department/hooks/use-open-department";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenDepartment();
  const departmentModal = useDeleteDepartment();

  return (
    <>
      <DeleteDepartmentDialog
        title="Delete Department"
        description="Are you to delete this department? This will permanently remove from our servers. This action cannot be undone."
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
          <DropdownMenuItem onClick={() => departmentModal.onOpen(id)}>
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
