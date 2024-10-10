"use client";

import useResponsive from "@/hooks/use-responsive";
import { paths } from "@/layouts/paths";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  closeCartDrawer,
  selectCartSubtotal,
} from "@/redux/reducers/cart/cartSlice";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Box, Button, Drawer, IconButton } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import CartItemSmall from "./cart-product-small-item-view";
import QuickOrderDialog from "@/sections/quick-order/view/quick-order-dilaog";
import useBoolean from "@/hooks/use-boolean";

const CartDrawer = () => {
  const { isCartDrawerOpen, cartItems } = useAppSelector((state) => state.cart);
  const dipatch = useAppDispatch();

  const subtotal = useAppSelector((state: RootState) =>
    selectCartSubtotal(state)
  );

  const handleClose = () => {
    dipatch(closeCartDrawer());
  };

  const quickOrderDialog = useBoolean();

  const isMdDown = useResponsive({ breakpoint: "md", direction: "down" });
  const [wasMdDown, setWasMdDown] = useState(isMdDown);

  useEffect(() => {
    // Close the drawer if the screen switches from larger to smaller than md
    if (isMdDown && !wasMdDown && isCartDrawerOpen) {
      handleClose();
    }

    // Update the flag to track the last screen size state
    setWasMdDown(isMdDown);
  }, [isMdDown, wasMdDown, isCartDrawerOpen]);

  const handleConfirmOrderClick = () => {
    handleClose();
    quickOrderDialog.setTrue();
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={isCartDrawerOpen}
        onClose={handleClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: {
              md: "400px",
              xs: "335px",
            },
          },
        }}
      >
        <div className="flex flex-col h-full">
          {/* Title Section - Fixed */}
          <div className="flex items-center justify-between px-5 py-5 border-b">
            <h3 className="text-xl md:text-2xl font-semibold text-black">
              Shopping Cart
            </h3>
            <IconButton
              onClick={handleClose}
              className="h-[2rem] w-[2rem] md:h-[3rem] md:w-[3rem]"
            >
              <Icon icon="carbon:close" className="text-3xl" />
            </IconButton>
          </div>

          {/* Scrollable Cart Items Section */}
          <div className="flex-1 overflow-y-auto p-5">
            <div className="divide-y divide-slate-100">
              {cartItems.length === 0 ? (
                <div>
                  <h3 className="text-lg mb-5">
                    আপনার কার্ট খালি। প্রিয় পণ্য পেতে পণ্য যোগ করুন।
                  </h3>
                  <Link href={paths.product.category} onClick={handleClose}>
                    <Button
                      variant="contained"
                      color="success"
                      size="large"
                      sx={{
                        textTransform: "capitalize",
                      }}
                    >
                      পণ্য দেখুন
                    </Button>
                  </Link>
                </div>
              ) : (
                cartItems.map((item, i) => (
                  <CartItemSmall key={i} item={item} />
                ))
              )}
            </div>
          </div>

          {/* Fixed Subtotal and Action Buttons Section */}
          {cartItems.length > 0 && (
            <div className="bg-neutral-100 p-5 border-t sticky bottom-0 w-full">
              <p className="flex justify-between font-semibold text-slate-900">
                <span>
                  <span className="text-lg">Subtotal</span>
                  <span className="block text-sm text-slate-500 font-normal">
                    Shipping and taxes calculated at checkout.
                  </span>
                </span>
                <span className="text-lg">৳{subtotal.toFixed(2)}</span>
              </p>
              <div className="flex flex-col gap-3 mt-7 w-full items-center justify-center">
                <Link
                  onClick={handleClose}
                  href={paths.cart.root}
                  className="w-full"
                >
                  <div
                    style={{
                      animation: "bounce 1.5s infinite",
                    }}
                    className="animate-bounce"
                  >
                    <Button
                      onClick={handleConfirmOrderClick}
                      variant="contained"
                      fullWidth
                      color="success"
                      size="large"
                      sx={{
                        textTransform: "capitalize",
                      }}
                    >
                      আপনার অর্ডার কনফার্ম করতে ক্লিক করুন
                    </Button>
                  </div>
                </Link>

                <Link onClick={handleClose} href={paths.cart.root}>
                  <Button
                    color="inherit"
                    sx={{
                      textTransform: "capitalize",
                      textDecoration: "underline",
                      color: "green",
                    }}
                  >
                    View cart
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Drawer>
      <QuickOrderDialog
        onClose={quickOrderDialog.setFalse}
        open={quickOrderDialog.value}
      />
    </>
  );
};

export default CartDrawer;
