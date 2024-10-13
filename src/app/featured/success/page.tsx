import { SplashScreen } from "@/components/loader/splash-screen";
import FeaturedSuccessView from "@/sections/featured/view/featured-success-view";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<SplashScreen />}>
      <FeaturedSuccessView />;
    </Suspense>
  );
};

export default Page;
