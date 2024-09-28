import { create } from "zustand";

type NewUniversityStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewUniversity = create<NewUniversityStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
