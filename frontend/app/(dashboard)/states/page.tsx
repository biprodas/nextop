"use client";

import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";

import { Heading } from "../_components/heading";
import { useNewState } from "~/features/state/hooks/use-new-state";
import StateClient from "./_components/client";

const StatePage = () => {
  const newState = useNewState();

  return (
    <div>
      <Heading
        title="State"
        description="List of states"
        extra={
          <Button onClick={newState.onOpen} className="rounded-full">
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        }
      />
      <StateClient />
    </div>
  );
};

export default StatePage;
