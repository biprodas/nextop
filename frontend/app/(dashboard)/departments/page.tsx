"use client";

import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";

import { Heading } from "../_components/heading";
import { useNewDepartment } from "~/features/department/hooks/use-new-department";
import DepartmentClient from "./_components/client";

const DepartmentPage = () => {
  const newDepartment = useNewDepartment();

  return (
    <div>
      <Heading
        title="Department"
        description="List of departments"
        extra={
          <Button onClick={newDepartment.onOpen} className="rounded-full">
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        }
      />
      <DepartmentClient />
    </div>
  );
};

export default DepartmentPage;
