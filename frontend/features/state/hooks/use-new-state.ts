import { create } from "zustand";

type NewStateStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewState = create<NewStateStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
