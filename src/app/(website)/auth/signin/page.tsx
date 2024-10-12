import LoadingSpinner from "@/components/loader/global-loading";
import SignInView from "@/sections/auth/signin-view";
import React, { Suspense } from "react";

const UserSignInPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SignInView />
    </Suspense>
  );
};

export default UserSignInPage;
