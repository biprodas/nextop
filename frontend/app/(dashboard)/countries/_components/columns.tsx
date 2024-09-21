"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type CountryColumn = {
  id: string;
  flag: string;
  name: string;
  code: string;
  phone: string;
  alpha2: string;
  alpha3: string;
  capital: string;
  createdAt?: string;
};

export const columns: ColumnDef<CountryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => row.original.capital,
  },
  {
    accessorKey: "phone",
    header: "Phone",
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
