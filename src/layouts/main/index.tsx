"use client";

import React, { ReactNode } from "react";
import Header from "./header";
import { Footer } from "./footer";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="w-xl mx-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
