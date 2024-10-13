import FeaturedLayout from "@/layouts/featured";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return <FeaturedLayout>{children}</FeaturedLayout>;
};

export default Layout;
