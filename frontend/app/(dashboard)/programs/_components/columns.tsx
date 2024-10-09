"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { IProgram } from "~/features/program/apis/dto";
import { Actions } from "./actions";
import { DataTableColumnHeader } from "~/components/data-table-column-header";

export const columns: ColumnDef<IProgram>[] = [
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
      <DataTableColumnHeader column={column} title="Program Name" />
    ),
  },
  // {
  //   accessorKey: "degree",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Degree" />
  //   ),
  // },
  // {
  //   accessorKey: "subject",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Subject" />
  //   ),
  // },
  {
    accessorKey: "departmentId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
    cell: ({ row }) => row.original.departmentId?.slice(0, 8),
  },
  {
    accessorKey: "universityId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="University" />
    ),
    cell: ({ row }) => row.original.universityId?.slice(0, 8),
  },
  {
    accessorKey: "session",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Session" />
    ),
  },
  {
    accessorKey: "language_proficiency",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Language Proficiency" />
    ),
    cell: ({ row }) => (
      <ul className="flex">
        <li>
          <small>IELTS</small>: {row.original.ielts}
        </li>
        {row.original.duolingo && (
          <li>
            <small>DUO</small>: {row.original.duolingo}
          </li>
        )}
        {row.original.toefl && (
          <li>
            <small>TOEFL</small>: {row.original.toefl}
          </li>
        )}
        {row.original.pte && (
          <li>
            <small>PTE</small>: {row.original.pte}
          </li>
        )}
      </ul>
    ),
  },
  {
    accessorKey: "note",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notes" />
    ),
  },
  {
    accessorKey: "priorityDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority Date" />
    ),
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deadline" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
