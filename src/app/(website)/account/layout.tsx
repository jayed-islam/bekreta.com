import AccountLayout from "@/layouts/account";
import React, { ReactNode } from "react";
type Props = {
  children: ReactNode;
};

const AccountLayoutPage = ({ children }: Props) => {
  return <AccountLayout>{children}</AccountLayout>;
};

export default AccountLayoutPage;
