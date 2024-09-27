import { Heading } from "../_components/heading";
import { AddCountry } from "./_components/add-country";
import CountryClient from "./_components/client";

const CountryPage = () => {
  return (
    <div>
      <Heading
        title="Country"
        description="List of countries"
        extra={<AddCountry />}
      />
      <CountryClient />
    </div>
  );
};

export default CountryPage;
