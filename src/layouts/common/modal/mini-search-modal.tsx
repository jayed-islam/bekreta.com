"use client";
import { paths } from "@/layouts/paths";
import { BooleanState } from "@/types/utils";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { Icon } from "@iconify-icon/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearchTerm } from "@/redux/reducers/product/productSlice";

interface ISearchModal {
  dialog: BooleanState;
}

const MiniSearchModal = ({ dialog }: ISearchModal) => {
  const { searchTerm } = useAppSelector((state) => state.product);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    router.push(`${paths.product.products}`);
    dialog.setFalse();
  };

  // Handle search input change
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    dispatch(setSearchTerm(searchValue));
  };

  const handleSearchSubmit = () => {
    router.push(`${paths.product.products}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
      dialog.setFalse();
    }
  };

  return (
    <Dialog
      open={dialog.value}
      onClose={dialog.setFalse}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        Search for Products
        <IconButton
          aria-label="close"
          onClick={dialog.setFalse}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Icon icon="mdi:close" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="search"
          label="Search for products"
          type="search"
          fullWidth
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchInputChange}
          onKeyDown={handleKeyDown}
        />
      </DialogContent>
      <DialogActions>
        <Button
          type="button"
          color="success"
          onClick={onSubmit}
          variant="contained"
          size="small"
          sx={{
            textTransform: "capitalize",
          }}
          startIcon={
            <Icon
              icon="iconamoon:search-light"
              className="text-white text-xl"
            />
          }
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MiniSearchModal;
