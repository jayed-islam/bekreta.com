"use client";

import React, { ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setCartItems } from "./cartSlice";
import { setLastVisitedProducts } from "../product/productSlice";

interface Props {
  children: ReactNode;
}

const CartAndLastVisitedInitializer: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize cart items from localStorage
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      dispatch(setCartItems(JSON.parse(storedCartItems)));
    }

    // Initialize last visited products from localStorage
    const storedLastVisitedProducts = localStorage.getItem(
      "lastVisitedProducts"
    );
    if (storedLastVisitedProducts) {
      dispatch(setLastVisitedProducts(JSON.parse(storedLastVisitedProducts)));
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default CartAndLastVisitedInitializer;
