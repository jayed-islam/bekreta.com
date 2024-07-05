"use client";

import CartDrawer from "@/layouts/common/modal/cart-drawer";
import MainLayout from "@/layouts/main";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLastVisitedProducts } from "@/redux/reducers/product/productSlice";
import { CartItem } from "@/types/cart";
import React, { FC, ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

const LayoutMain: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const loadLastVisitedProducts = (): CartItem[] => {
      const storedProducts = localStorage.getItem("lastVisitedProducts");
      return storedProducts ? JSON.parse(storedProducts) : [];
    };

    const lastVisitedProducts = loadLastVisitedProducts();
    dispatch(setLastVisitedProducts(lastVisitedProducts));
  }, [dispatch]);
  return (
    <MainLayout>
      {children}
      <CartDrawer />
    </MainLayout>
  );
};

export default LayoutMain;
