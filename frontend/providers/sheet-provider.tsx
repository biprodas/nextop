"use client";

import { useMountedState } from "react-use";

import { EditCategorySheet } from "~/features/category/components/edit-category-sheet";
import { NewCategorySheet } from "~/features/category/components/new-category-sheet";
import { EditProfessorSheet } from "~/features/professor/components/edit-professor-sheet";
import { NewProfessorSheet } from "~/features/professor/components/new-professor-sheet";
import { EditStateSheet } from "~/features/state/components/edit-state-sheet";
import { NewStateSheet } from "~/features/state/components/new-state-sheet";
import { EditUniversitySheet } from "~/features/university/components/edit-university-sheet";
import { NewUniversitySheet } from "~/features/university/components/new-university-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewCategorySheet />
      <EditCategorySheet />

      <NewStateSheet />
      <EditStateSheet />

      <NewUniversitySheet />
      <EditUniversitySheet />

      <NewProfessorSheet />
      <EditProfessorSheet />
    </>
  );
};
