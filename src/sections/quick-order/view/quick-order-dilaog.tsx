// QuickOrderDialog.tsx
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  Divider,
  Box,
  Grid,
  Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Close, Person, Phone, Home, Note } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import OrderCartItemRow from "../order-cart-item-row";
import { QuickOrderFormData } from "@/validations/quick-order-validation";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "@/redux/reducers/cart/cartSlice";
import FormProvider, { RHFTextField } from "@/components/react-hook-form";
import CartItemSmall from "@/layouts/common/modal/cart-product-small-item-view";
import useResponsive from "@/hooks/use-responsive";
import DeliveryOptionsComponent from "../order-delivery-option";

interface QuickOrderDialogProps {
  open: boolean;
  onClose: () => void;
}

const QuickOrderDialog: React.FC<QuickOrderDialogProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);
  //   const [createOrder, { isLoading }] = useCreateOrderMutation();

  const methods = useForm<QuickOrderFormData>({
    // resolver: zodResolver(checkoutSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    if (cartItems.length === 0) {
      toast.error("আপনার ঝুড়িতে কোনো পণ্য নেই।");
      return;
    }

    // Prepare order data
    const products = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    const payload = {
      name: data.name,
      phone: data.phone,
      address: data.address,
      couponCode: data.couponCode,
      orderNote: data.orderNote,
      products,
    };

    console.log("ii", payload);

    try {
      //   const response = await createOrder(payload).unwrap();
      //   if (response.success) {
      //     toast.success("অর্ডার সফলভাবে সম্পন্ন হয়েছে!");
      //     // Optionally clear cart or perform other actions
      //     onClose();
      //   } else {
      //     toast.error(response.message || "অর্ডার সম্পন্ন হয়নি।");
      //   }
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("অর্ডার সম্পন্ন হয়নি।");
    }
  });

  const isSmUp = useResponsive({ breakpoint: "sm", direction: "up" });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Dialog
        fullScreen={isSmUp ? false : true}
        open={open}
        onClose={onClose}
        maxWidth="xs"
        fullWidth
        sx={{
          p: 0,
          mx: 0,
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontSize: {
                  xs: "1.3rem",
                  lg: "1.5rem",
                },
                textAlign: "center",
              }}
            >
              ক্যাশ অন ডেলিভারিতে
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontSize: {
                  xs: "1rem",
                  md: "1.3rem",
                },
                textAlign: "center",
              }}
            >
              অর্ডার করতে আপনার তথ্য দিন
            </Typography>
          </Stack>
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 3,
              top: 3,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            px: {
              xs: 2,
              sm: 3,
            },
          }}
        >
          <div className="flex flex-col gap-2">
            <RHFTextField
              name="name"
              label="আপনার নাম"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              name="phone"
              label="মোবাইল নাম্বার"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              name="address"
              label="এড্রেস/ঠিকানা"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Home />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Delivery Options */}
          <div className="mt-3">
            <DeliveryOptionsComponent />
          </div>

          {/* Coupon Code */}
          <Stack mt={3} direction="row" spacing={2}>
            <RHFTextField
              size="small"
              name="couponCode"
              label="কুপন কোড"
              fullWidth
            />
            <Button
              size="small"
              variant="contained"
              color="success"
              sx={{
                px: 5,
              }}
            >
              এপ্লাই
            </Button>
          </Stack>

          {/* Cart Items */}
          <Box mt={3}>
            <Typography variant="subtitle1" gutterBottom>
              আপনার পণ্যসমূহ
            </Typography>
            <Divider />
            {cartItems.length === 0 ? (
              <Typography mt={2}>আপনার ঝুড়িতে কোনো পণ্য নেই।</Typography>
            ) : (
              <div className="mt-3 flex-col">
                {cartItems.map((item) => (
                  <CartItemSmall key={item.productId} item={item} />
                ))}
              </div>
            )}
          </Box>

          {/* Order Note */}
          <Box mt={3}>
            <RHFTextField
              name="orderNote"
              label="অর্ডার নোট"
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            px: {
              xs: 2,
            },
            py: 2,
          }}
        >
          <Button onClick={onClose} color="success">
            বাতিল করুন
          </Button>
          <Button
            variant="contained"
            color="success"
            type="submit"
            //   disabled={isLoading}
            disabled={cartItems.length === 0}
          >
            অর্ডার সম্পন্ন করুন
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};

export default QuickOrderDialog;
