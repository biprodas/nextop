"use client";

import { useMountedState } from "react-use";
import { EditCategorySheet } from "~/features/category/components/edit-category-sheet";
import { NewCategorySheet } from "~/features/category/components/new-category-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewCategorySheet />
      <EditCategorySheet />
    </>
  );
};
