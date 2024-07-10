import SignInView from "@/sections/auth/signin-view";
import React, { Suspense } from "react";

const UserSignInPage = () => {
  return (
    <Suspense>
      <SignInView />
    </Suspense>
  );
};

export default UserSignInPage;
