import { create } from "zustand";

type NewProfessorStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewProfessor = create<NewProfessorStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
