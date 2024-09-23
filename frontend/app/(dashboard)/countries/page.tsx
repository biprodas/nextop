import { Heading } from "../_components/heading";
import { AddCountry } from "./_components/add-country";
import CountryClient from "./_components/client";

const CountryPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center border-b mb-3">
        <Heading title="Country" description="List of countries" />
        <div>
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
