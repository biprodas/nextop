"use client";

import { DataTable } from "~/components/data-table";
import { columns } from "./columns";
import { useGetStatesQuery } from "~/features/state/apis/queries";
import Loader from "~/components/loader";

const StateClient = () => {
  const { data: state, isLoading, isError, error } = useGetStatesQuery();

  if (isLoading) return <Loader />;

  if (isError) return <div>{error?.message}</div>;

  return (
    <DataTable columns={columns} data={state?.data || []} searchKey="name" />
  );
};

export default StateClient;
