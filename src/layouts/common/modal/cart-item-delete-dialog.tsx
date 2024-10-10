import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
} from "@mui/material";
import { useAppDispatch } from "@/redux/hooks";
import { BooleanState } from "@/types/utils";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React from "react";
import { removeFromCart } from "@/redux/reducers/cart/cartSlice";
import { Close, Remove } from "@mui/icons-material";

interface ICartDialogProps {
  dialog: BooleanState;
  productId: string;
}

const DeleteConfirmationModal = ({ dialog, productId }: ICartDialogProps) => {
  const dispatch = useAppDispatch();

  // const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

  // const handleRemoveProduct = async (productId: string) => {
  //   try {
  //     const res = await removeFromCart(productId).unwrap();
  //     if (res.success) {
  //       toast.success(res.message);
  //     } else {
  //       toast.error(res.message);
  //     }
  //   } catch (err: any) {
  //     toast.error(err.data.message);
  //   }
  // };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <Dialog
      open={dialog.value}
      onClose={dialog.setFalse}
      maxWidth="xs"
      fullWidth
    >
      <div className="relative">
        <DialogTitle
          id="remove-dialog-title"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Remove From Cart
          <IconButton edge="end" onClick={dialog.setFalse}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <p className="text-sm">Item(s) will be removed from your cart.</p>
        </DialogContent>

        <div className="flex px-5 pb-5 items-center justify-end gap-5">
          <Button onClick={dialog.setFalse} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => handleRemoveItem(productId)}
            variant="contained"
            color="error"
          >
            Remove
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
