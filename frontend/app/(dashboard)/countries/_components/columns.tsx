"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "~/components/ui/checkbox";
import { DataTableColumnHeader } from "~/components/data-table-column-header";
import { ICountry } from "~/features/country/api/dto";

// export type CountryColumn = {
//   id: string;
//   flag?: string;
//   name?: string;
//   code?: string;
//   phone?: string;
//   alpha2?: string;
//   alpha3?: string;
//   capital?: string;
//   createdAt?: string;
// };

export const columns: ColumnDef<ICountry>[] = [
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
    accessorKey: "alpha2Code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ISO Alpha 2" />
    ),
  },
  {
    accessorKey: "alpha3Code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ISO Alpha 3" />
    ),
  },
  {
    accessorKey: "numericCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ISO Code" />
    ),
  },
  {
    accessorKey: "callingCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dialing Code" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
