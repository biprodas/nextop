import { create } from "zustand";

type NewDepartmentStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewDepartment = create<NewDepartmentStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
