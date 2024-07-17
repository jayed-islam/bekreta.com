import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { BooleanState } from "@/types/utils";

interface Props {
  dialog: BooleanState;
  orderId: string;
}

export default function OrderSuccessModal({ dialog, orderId }: Props) {
  return (
    <Dialog
      open={dialog.value}
      onClose={dialog.setFalse}
      maxWidth="xs"
      fullWidth
      sx={{
        borderRadius: "2rem",
      }}
    >
      <DialogContent>
        <div className="flex items-center flex-col justify-center">
          <CheckCircleOutlineIcon sx={{ fontSize: 71, color: "green" }} />
          <h2 className="text-xl font-semibold text-center">
            Congrats!!! your Order Successfully Placed!
          </h2>
          <h2 className="text-lg text-center">
            Order ID: <span className="font-semibold ml-2">{orderId}</span>
          </h2>
        </div>
      </DialogContent>
      <div className="flex items-center justify-end px-4 py-2">
        <Button
          onClick={dialog.setFalse}
          autoFocus
          variant="contained"
          className="bg-green-500 hover:bg-green-600 text-white capitalize"
        >
          Close
        </Button>
      </div>
    </Dialog>
  );
}
