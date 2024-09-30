"use client";

import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";

import { Heading } from "../_components/heading";
import { useNewProgram } from "~/features/program/hooks/use-new-program";
import ProgramClient from "./_components/client";

const ProgramPage = () => {
  const newProgram = useNewProgram();

  return (
    <div>
      <Heading
        title="Program"
        description="List of programs"
        extra={
          <Button onClick={newProgram.onOpen} className="rounded-full">
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        }
      />
      <ProgramClient />
    </div>
  );
};

export default ProgramPage;
