"use client";

import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";

import { Heading } from "../_components/heading";
import StateClient from "./_components/client";
import { useNewProfessor } from "~/features/professor/hooks/use-new-professor";

const ProfessorPage = () => {
  const newProfessor = useNewProfessor();

  return (
    <div>
      <Heading
        title="Professors"
        description="List of professors"
        extra={
          <Button onClick={newProfessor.onOpen} className="rounded-full">
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        }
      />
      <StateClient />
    </div>
  );
};

export default ProfessorPage;
