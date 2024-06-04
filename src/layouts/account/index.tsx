import React, { ReactNode } from "react";
import AccountSidebar from "./sidebar";

type AccountLayoutProps = {
  children: ReactNode;
};

const AccountLayout = ({ children }: AccountLayoutProps) => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-6xl mx-auto px-5 xl:px-0 flex items-start gap-5 py-7 md:py-16">
        <AccountSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default AccountLayout;
