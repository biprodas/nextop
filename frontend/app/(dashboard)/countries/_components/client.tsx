"use client";

import { DataTable } from "~/components/data-table";
import Loader from "~/components/loader";
import { useGetCountriesQuery } from "~/features/country/api/queries";
import { columns } from "./columns";

const CountryClient = () => {
  const { data: country, isLoading, isError, error } = useGetCountriesQuery();

  if (isLoading) return <Loader />;

  if (isError) return <div>{error?.message}</div>;

  return (
    <div>
      <DataTable
        columns={columns}
        data={country?.data || []}
        searchKey="name"
      />
    </div>
  );
};

export default CountryClient;
