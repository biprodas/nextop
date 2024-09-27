// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "~/components/ui/dialog";
// import { Button } from "../ui/button";
// import { useConfirmStore } from "~/hooks/use-confirm-store";

// interface ConfirmDialogProps {
//   // isOpen: boolean;
//   // onConfirm: () => void;
//   // onClose: () => void;
//   okBtnLabel?: string;
//   cancelBtnLabel?: string;
//   loading?: boolean;
// }

// export const ConfirmDialog = ({
//   okBtnLabel = "Confirm",
//   cancelBtnLabel = "Cancel",
//   loading,
// }: ConfirmDialogProps) => {
//   const { isOpen, confirm, closeConfirm } = useConfirmStore();

//   return (
//     <Dialog open={isOpen} onOpenChange={closeConfirm}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Confirm Deletion</DialogTitle>
//         </DialogHeader>
//         <DialogDescription>
//           Are you sure you want to delete this item?
//         </DialogDescription>
//         {/* <p className="text-sm font-light">Are you sure you?</p> */}
//         <DialogFooter>
//           <Button variant="outline" onClick={closeConfirm}>
//             {cancelBtnLabel}
//           </Button>
//           <Button onClick={confirm} disabled={loading}>
//             {okBtnLabel}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };
