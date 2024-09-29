import { create } from "zustand";

type DeleteDepartmentStore = {
  id: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useDeleteDepartment = create<DeleteDepartmentStore>((set) => ({
  id: "",
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
