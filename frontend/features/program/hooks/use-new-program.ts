import { create } from "zustand";

type NewProgramStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewProgram = create<NewProgramStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
