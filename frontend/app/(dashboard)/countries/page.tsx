import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Button } from "~/components/ui/button";
import CountryClient from "./_components/client";

const CountryPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center border-b mb-3">
        <div>
          <h2 className="text-2xl font-medium">Country List</h2>
          <p className="text-sm font-light">List of countries</p>
        </div>
        <div>
          <Button className="rounded-full">
            <FaPlus size={12} className="me-1" /> <span>Add New</span>
          </Button>
        </div>
      </div>
      <div>
        <CountryClient />
      </div>
    </div>
  );
};

export default CountryPage;
