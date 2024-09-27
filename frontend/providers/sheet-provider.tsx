"use client";

import { useMountedState } from "react-use";
import { NewCategorySheet } from "~/features/category/components/new-category-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewCategorySheet />
    </>
  );
};
