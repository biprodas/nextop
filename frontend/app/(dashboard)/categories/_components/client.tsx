"use client";

import { Loader2 } from "lucide-react";
import { useGetCategoriesQuery } from "~/apis/category/queries";
import { DataTable } from "~/components/data-table";
import { columns } from "./columns";

const CategoryClient = () => {
  const { data: category, isLoading, isError, error } = useGetCategoriesQuery();

  if (isLoading)
    return <Loader2 className="size-6 text-slate-700 animate-spin" />;

  if (isError) return <div>{error?.message}</div>;

  return (
    <div>
      <DataTable
        columns={columns}
        data={category?.data || []}
        searchKey="name"
      />
    </div>
  );
};

export default CategoryClient;
