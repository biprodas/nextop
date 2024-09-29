import { create } from "zustand";

type OpenDepartmentStore = {
  id: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useOpenDepartment = create<OpenDepartmentStore>((set) => ({
  id: "",
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
