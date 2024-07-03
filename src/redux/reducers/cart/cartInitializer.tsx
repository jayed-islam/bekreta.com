"use client";

import React, { ReactNode, useEffect } from "react";
import { CartItem } from "@/types/cart";
import { setCartItems } from "./cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetUserCartsQuery } from "./cartApi";

interface Props {
  children: ReactNode;
}

const CartInitializer: React.FC<Props> = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);

  const { data } = useGetUserCartsQuery(user?._id as string);

  // useEffect(() => {
  //   const storedCartItems = localStorage.getItem("cartItems");
  //   if (storedCartItems) {
  //     const cartItems: CartItem[] = JSON.parse(storedCartItems);
  //     dispatch(setCartItems(cartItems));
  //   }
  // }, [dispatch]);

  return <>{children}</>;
};

export default CartInitializer;
