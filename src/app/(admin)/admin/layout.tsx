import { AuthGuard } from "@/auth/guard/auth-guard";
import { RoleBasedGuard } from "@/auth/guard/role-based-guard";
import MainAdminLayout from "@/layouts/admin";
import { UserRoles } from "@/types/user";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <AuthGuard isAdminLogin>
      <RoleBasedGuard hasContent roles={[UserRoles.superAdmin]}>
        <MainAdminLayout>{children}</MainAdminLayout>
      </RoleBasedGuard>
    </AuthGuard>
  );
};

export default AdminLayout;
