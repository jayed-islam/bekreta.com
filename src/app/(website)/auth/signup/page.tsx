import LoadingSpinner from "@/components/loader/global-loading";
import SignUpView from "@/sections/auth/siginup-view";
import React, { Suspense } from "react";

const UserSignUpPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SignUpView />
    </Suspense>
  );
};

export default UserSignUpPage;
