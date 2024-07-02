import CartDrawer from "@/layouts/common/modal/cart-drawer";
import MainLayout from "@/layouts/main";
import CartInitializer from "@/redux/reducers/cart/cartInitializer";
import React, { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const LayoutMain: FC<Props> = ({ children }) => (
  <MainLayout>
    <CartInitializer>{children}</CartInitializer>
    <CartDrawer />
  </MainLayout>
);

export default LayoutMain;
