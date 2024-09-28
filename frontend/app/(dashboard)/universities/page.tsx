"use client";

import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";

import { Heading } from "../_components/heading";
import UniversityClient from "./_components/client";
import { useNewUniversity } from "~/features/university/hooks/use-new-university";

const UniversityPage = () => {
  const newUniversity = useNewUniversity();

  return (
    <div>
      <Heading
        title="University"
        description="List of universities"
        extra={
          <Button onClick={newUniversity.onOpen} className="rounded-full">
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        }
      />
      <UniversityClient />
    </div>
  );
};

export default UniversityPage;
