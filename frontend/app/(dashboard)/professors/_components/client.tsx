"use client";

import { DataTable } from "~/components/data-table";
import { columns } from "./columns";
import Loader from "~/components/loader";
import { useGetProfessorsQuery } from "~/features/professor/apis/queries";

const ProfessorClient = () => {
  const {
    data: professor,
    isLoading,
    isError,
    error,
  } = useGetProfessorsQuery();

  if (isLoading) return <Loader />;

  if (isError) return <div>{error?.message}</div>;

  return (
    <DataTable
      columns={columns}
      data={professor?.data || []}
      searchKey="name"
    />
  );
};

export default ProfessorClient;
