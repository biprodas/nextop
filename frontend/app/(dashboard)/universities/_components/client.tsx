"use client";

import { DataTable } from "~/components/data-table";
import { columns } from "./columns";
import Loader from "~/components/loader";
import { useGetUniversitiesQuery } from "~/features/university/apis/queries";

const UniversityClient = () => {
  const {
    data: university,
    isLoading,
    isError,
    error,
  } = useGetUniversitiesQuery();

  if (isLoading) return <Loader />;

  if (isError) return <div>{error?.message}</div>;

  return (
    <DataTable
      columns={columns}
      data={university?.data || []}
      searchKey="name"
    />
  );
};

export default UniversityClient;
