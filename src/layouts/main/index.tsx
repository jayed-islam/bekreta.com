import React, { ReactNode } from "react";
import Header from "./header";
import { Footer } from "./footer";
import BottomNav from "./bottom-navigation-bar";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="w-xl mx-auto">{children}</div>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default MainLayout;
