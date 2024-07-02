"use client";

import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CartItem } from "@/types/cart";
import { setCartItems } from "./cartSlice";

interface Props {
  children: ReactNode;
}

const CartInitializer: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      const cartItems: CartItem[] = JSON.parse(storedCartItems);
      dispatch(setCartItems(cartItems));
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default CartInitializer;
