import React, { ReactNode } from "react";
import FeaturedHeader from "./featured-header";
import FeaturedFooter from "./featured-footer";
import FeaturedTopHeader from "./featured-top-header";

interface Props {
  children: ReactNode;
}

const FeaturedLayout = ({ children }: Props) => {
  return (
    <div>
      <FeaturedTopHeader />
      <FeaturedHeader />
      {children}
      <FeaturedFooter />
    </div>
  );
};

export default FeaturedLayout;
