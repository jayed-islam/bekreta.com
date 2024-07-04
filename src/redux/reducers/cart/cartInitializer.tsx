"use client";

import React, { ReactNode, useEffect } from "react";
import { CartItem } from "@/types/cart";
import { setCartItems } from "./cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetUserCartsQuery } from "./cartApi";
import { setLastVisitedProducts } from "../product/productSlice";

interface Props {
  children: ReactNode;
}

const CartInitializer: React.FC<Props> = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);

  const { data } = useGetUserCartsQuery(user?._id as string);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadLastVisitedProducts = (): CartItem[] => {
      const storedProducts = localStorage.getItem("lastVisitedProducts");
      return storedProducts ? JSON.parse(storedProducts) : [];
    };

    const lastVisitedProducts = loadLastVisitedProducts();
    dispatch(setLastVisitedProducts(lastVisitedProducts));
  }, [dispatch]);

  return <>{children}</>;
};

export default CartInitializer;
