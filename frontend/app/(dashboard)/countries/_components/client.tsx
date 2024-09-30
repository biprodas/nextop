"use client";

import { Loader2 } from "lucide-react";
import { useGetCountriesQuery } from "~/apis/country/queries";
import { DataTable } from "~/components/data-table";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { columns } from "./columns";

const CountryClient = () => {
  const { data: country, isLoading, isError, error } = useGetCountriesQuery();

  if (isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // if (isLoading) return <div>Loading countries...</div>;
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
