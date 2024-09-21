"use client";

import { DataTable } from "~/components/ui/data-table";
import { columns } from "./columns";
import useGetCountries from "~/apis/country/queries";

const CountryClient = () => {
  const { data: country, isLoading, isError, error } = useGetCountries();

  if (isLoading) return <div>Loading countries...</div>;
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
