"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Actions } from "./actions";
import { IUniversity } from "~/features/university/apis/dto";
import { DataTableColumnHeader } from "~/components/data-table-column-header";

export const columns: ColumnDef<IUniversity>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "acronym",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Short Name" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
  },
  {
    accessorKey: "website",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Website" />
    ),
  },
  {
    accessorKey: "ranking",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ranking" />
    ),
  },
  // {
  //   accessorKey: "details",
  //   header: ({ column }) => (
  //     <Button variant="ghost" size="sm">
  //       Details
  //     </Button>
  //   ),
  // },
  {
    accessorKey: "countryId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Country" />
    ),
    cell: ({ row }) => row.original.countryId.slice(0, 8),
  },
  {
    accessorKey: "stateId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="State" />
    ),
    cell: ({ row }) => row.original.stateId?.slice(0, 8),
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
