"use client";

import { DataTable } from "~/components/data-table";
import { columns } from "./columns";
import { useGetProgramsQuery } from "~/features/program/apis/queries";
import Loader from "~/components/loader";

const ProgramClient = () => {
  const { data: program, isLoading, isError, error } = useGetProgramsQuery();

  if (isLoading) return <Loader />;

  if (isError) return <div>{error?.message}</div>;

  return (
    <DataTable columns={columns} data={program?.data || []} searchKey="name" />
  );
};

export default ProgramClient;
