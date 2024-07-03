import { AuthGuard } from "@/auth/guard/auth-guard";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const CartLayout = ({ children }: Props) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default CartLayout;
