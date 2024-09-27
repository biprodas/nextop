"use client";

import { useMountedState } from "react-use";

import { EditCategorySheet } from "~/features/category/components/edit-category-sheet";
import { NewCategorySheet } from "~/features/category/components/new-category-sheet";
import { EditStateSheet } from "~/features/state/components/edit-state-sheet";
import { NewStateSheet } from "~/features/state/components/new-state-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewCategorySheet />
      <EditCategorySheet />

      <NewStateSheet />
      <EditStateSheet />
    </>
  );
};
