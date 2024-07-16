import MainAdminLayout from "@/layouts/admin";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return <MainAdminLayout>{children}</MainAdminLayout>;
};

export default AdminLayout;
