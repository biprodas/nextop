import { create } from "zustand";
import { ICountry } from "~/apis/country/dto";

type ModalType = "view" | "add" | "edit" | "delete";

interface useCountryModalStore {
  isOpen: boolean;
  open: ModalType | null;
  data?: ICountry | null;
  onOpen: (open: ModalType, data?: ICountry) => void;
  onClose: () => void;
  onOpenChange: () => void;
}

export const useCountryModal = create<useCountryModalStore>((set) => ({
  isOpen: false,
  // type: 'modal' | sheet,
  open: null,
  data: null,
  // onOpen: () => set({ isOpen: true }),
  onOpen: (open: ModalType, data?: ICountry) =>
    set({ isOpen: true, open, data }),
  onClose: () => set({ isOpen: false, open: null, data: null }),
  onOpenChange: () =>
    set((state) => ({ isOpen: !state.isOpen, open: null, data: null })),
}));
