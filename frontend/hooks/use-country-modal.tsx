import { create } from "zustand";

interface useCountryModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCountryModal = create<useCountryModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
