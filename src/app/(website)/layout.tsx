import CartDrawer from "@/layouts/common/modal/cart-drawer";
import MainLayout from "@/layouts/main";
import React, { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const LayoutMain: FC<Props> = ({ children }) => (
  <MainLayout>
    {children}
    <CartDrawer />
  </MainLayout>
);

export default LayoutMain;
