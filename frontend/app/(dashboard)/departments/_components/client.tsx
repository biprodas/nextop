"use client";

import { DataTable } from "~/components/data-table";
import { columns } from "./columns";
import { useGetDepartmentsQuery } from "~/features/department/apis/queries";
import Loader from "~/components/loader";

const DepartmentClient = () => {
  const {
    data: department,
    isLoading,
    isError,
    error,
  } = useGetDepartmentsQuery();

  if (isLoading) return <Loader />;

  if (isError) return <div>{error?.message}</div>;

  return (
    <DataTable
      columns={columns}
      data={department?.data || []}
      searchKey="name"
    />
  );
};

export default DepartmentClient;
