import { AuthGuard } from "@/auth/guard/auth-guard";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const CheckoutLayout = ({ children }: Props) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default CheckoutLayout;
