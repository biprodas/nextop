import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Button } from "~/components/ui/button";
import CountryClient from "./_components/client";
import { Heading } from "../_components/heading";
import { AddCountry } from "./_components/add-country";

const CountryPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center border-b mb-3">
        <Heading title="Country" description="List of countries" />
        <div>
          <Button className="rounded-full">
            <FaPlus size={12} className="me-1" /> <span>Add New</span>
          </Button>
          <AddCountry />
        </div>
      </div>
      <div>
        <CountryClient />
      </div>
    </div>
  );
};

export default CountryPage;
