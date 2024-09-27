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
      <Heading
        title="Category"
        description="List of categories"
        extra={
          <Button onClick={newCategory.onOpen} className="rounded-full">
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        }
      />
      <CategoryClient />
    </div>
  );
};

export default CategoriesPage;
