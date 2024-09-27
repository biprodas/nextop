// import { useState } from "react";

// export const useConfirmDialog = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

//   const openConfirmDialog = (confirmAction: () => void) => {
//     setIsOpen(true);
//     setOnConfirm(() => confirmAction);
//   };

//   const closeConfirmDialog = () => {
//     setIsOpen(false);
//     setOnConfirm(null);
//   };

//   const confirm = () => {
//     if (onConfirm) {
//       onConfirm();
//     }
//     closeConfirmDialog();
//   };

//   return {
//     isOpen,
//     openConfirmDialog,
//     closeConfirmDialog,
//     confirm,
//   };
// };
