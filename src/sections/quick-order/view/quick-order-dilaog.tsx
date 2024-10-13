// QuickOrderDialog.tsx
"use client";

import React, { useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  InputAdornment,
  Divider,
  Box,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Close, Person, Phone, Home } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  clearCart,
  selectCartSubtotal,
  selectCartTotalPrice,
} from "@/redux/reducers/cart/cartSlice";
import FormProvider, { RHFTextField } from "@/components/react-hook-form";
import CartItemSmall from "@/layouts/common/modal/cart-product-small-item-view";
import useResponsive from "@/hooks/use-responsive";
import DeliveryOptionsComponent from "../order-delivery-option";
import { paths } from "@/layouts/paths";
import { useCreateOrderMutation } from "@/redux/reducers/order/orderApi";
import {
  checkoutSchema,
  TCheckoutFormData,
} from "@/validations/checkout-validation-schema";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";

interface QuickOrderDialogProps {
  open: boolean;
  onClose: () => void;
}

const QuickOrderDialog: React.FC<QuickOrderDialogProps> = ({
  open,
  onClose,
}) => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  const totalPrice = useAppSelector((state) => selectCartTotalPrice(state));
  const subtotal = useAppSelector((state) => selectCartSubtotal(state));

  const { deliveryCharge, selectedDeliveryOption } = useAppSelector(
    (state) => state.cart
  );

  const methods = useForm<TCheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.name,
    },
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const dialogContentRef = useRef<HTMLDivElement | null>(null);

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);

      if (element && dialogContentRef.current) {
        // Smooth scroll to the first error element within the dialog content
        dialogContentRef.current.scrollTo({
          top:
            element.getBoundingClientRect().top +
            dialogContentRef.current.scrollTop -
            100,
          behavior: "smooth",
        });

        // Optionally, focus the first error field
        (element as HTMLElement).focus();
      }
    }
  }, [errors]);

  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(errors).length > 0) {
      toast.error("Please add required fileds!!");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Please add minimum 1 product for order");
      return;
    }

    const products = cartItems.map((item) => ({
      product: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    const payload = {
      ...(user && { userId: user?._id as string }),
      phone: data.phone,
      name: data.name,
      address: data.address,
      ...(data.orderNote && { orderNote: data.orderNote }),
      totalPrice: totalPrice,
      products,
      deliveryArea: selectedDeliveryOption,
      deliveryCharge,
    };

    const response = await createOrder(payload).unwrap();

    if (response.success) {
      toast.success(response.message);
      onClose();
      dispatch(clearCart());
      router.push(`${paths.success}?id=${response.data._id}`);
    } else {
      toast.error(response.message);
    }
    try {
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.data.message);
    }
  });

  const isSmUp = useResponsive({ breakpoint: "sm", direction: "up" });

  return (
    <>
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
        <DialogTitle>
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
            px: 0,
            py: 0,
            position: "relative",
          }}
          ref={dialogContentRef}
        >
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <div className="px-3 sm:px-5 py-4">
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
              {/* <Stack mt={3} direction="row" spacing={2}>
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
              </Stack>*/}

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

              <div className="bg-gray-100 p-3 border rounded space-y-2 text-sm mt-3">
                <div className="flex justify-between">
                  <span className="font-semibold">সাব টোটাল</span>
                  <span>Tk {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">ডেলিভারি চার্জ</span>
                  <span>Tk {deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 border-gray-300">
                  <span className="font-semibold text-lg">সর্বমোট</span>
                  <span className="text-lg font-bold">
                    Tk {totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Order Note */}
              <Box mt={3}>
                <RHFTextField
                  name="orderNote"
                  label="অর্ডার নোট"
                  multiline
                  rows={2}
                />
              </Box>
            </div>
            <DialogActions
              sx={{
                position: "sticky",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1100,
                backgroundColor: (theme) => theme.palette.background.paper,
                px: { xs: 2 },
                py: 2,
                borderTop: "1px solid #E0E0E0",
              }}
            >
              <Button onClick={onClose} color="success">
                বাতিল করুন
              </Button>
              <LoadingButton
                variant="contained"
                color="success"
                type="submit"
                disabled={cartItems.length === 0 || isLoading}
                loading={isLoading}
              >
                অর্ডার সম্পন্ন করুন
              </LoadingButton>
            </DialogActions>
          </FormProvider>
        </DialogContent>
        {/* </div> */}
        {/* </FormProvider> */}
        {/* <DialogActions
        //   sx={{
        //     position: "sticky",
        //     bottom: 0,
        //     left: 0,
        //     right: 0,
        //     zIndex: 1100,
        //     backgroundColor: (theme) => theme.palette.background.paper,
        //     px: { xs: 2 },
        //     py: 2,
        //     borderTop: "1px solid #E0E0E0",
        //   }}
        >
          <Button onClick={onClose} color="success">
            বাতিল করুন
          </Button>
          <Button
            variant="contained"
            color="success"
            type="submit"
            disabled={cartItems.length === 0 || isLoading}
          >
            অর্ডার সম্পন্ন করুন
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default QuickOrderDialog;
