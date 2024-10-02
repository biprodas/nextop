"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Button } from "~/components/ui/button";
import { ArrowUpDown } from "lucide-react";
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
    // header: "Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => row.original.capital,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount") || "0");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "phone",
    // header: "Phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
  },
  {
    accessorKey: "alpha2",
    header: "Alpha 2",
  },
  {
    accessorKey: "alpha3",
    header: "Alpha 3",
  },
  {
    accessorKey: "capital",
    header: "Capital",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
