// import { create } from "zustand";

// interface ConfirmDialogStore {
//   isOpen: boolean;
//   onConfirm: (() => void) | null;
//   openConfirm: (onConfirm: () => void) => void;
//   closeConfirm: () => void;
//   confirm: () => void;
// }

// export const useConfirmStore = create<ConfirmDialogStore>((set) => ({
//   isOpen: false,
//   onConfirm: null,
//   openConfirm: (onConfirm) => set({ isOpen: true, onConfirm }),
//   closeConfirm: () => set({ isOpen: false, onConfirm: null }),
//   confirm: () =>
//     set((state) => {
//       if (state.onConfirm) {
//         state.onConfirm(); // Execute the action
//       }
//       return { isOpen: false, onConfirm: null }; // Close the dialog
//     }),
// }));
