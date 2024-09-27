"use client";

import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { useNewCategory } from "~/features/category/hooks/use-new-category";

import { Heading } from "../_components/heading";
import CategoryClient from "./_components/client";

const CategoriesPage = () => {
  const newCategory = useNewCategory();

  return (
    <div>
      <div className="flex justify-between items-center border-b mb-3">
        <Heading title="Category" description="List of categories" />
        <div>
          <Button
            onClick={newCategory.onOpen}
            size="sm"
            className="rounded-full"
          >
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </div>
      </div>
      <div>
        <CategoryClient />
      </div>
    </div>
  );
};

export default CategoriesPage;
