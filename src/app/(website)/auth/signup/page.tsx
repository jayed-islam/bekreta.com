import SignUpView from "@/sections/auth/siginup-view";
import React, { Suspense } from "react";

const UserSignUpPage = () => {
  return (
    <Suspense>
      <SignUpView />
    </Suspense>
  );
};

export default UserSignUpPage;
