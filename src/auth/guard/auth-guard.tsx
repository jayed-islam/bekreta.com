"use client";

import { paths } from "@/layouts/paths";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { isValidToken } from "../utils";
import { SplashScreen } from "@/components/loader/splash-screen";
import { logout } from "@/redux/reducers/auth/authSlice";

const loginPaths: Record<string, string> = {
  login: paths.website.signin,
  adminLogin: paths.signin,
};

interface IAuthGuardProps {
  children: ReactNode;
  isAdminLogin?: boolean;
}

export const AuthGuard: FC<IAuthGuardProps> = ({ children, isAdminLogin }) => {
  const { authLoading } = useAppSelector((state) => state.auth);
  return (
    <>
      {authLoading ? (
        <SplashScreen />
      ) : (
        <Container isAdminLogin={isAdminLogin}>{children}</Container>
      )}
    </>
  );
};

function Container({ children, isAdminLogin }: IAuthGuardProps) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  let accessToken: string | null = null;

  if (typeof window === "object") {
    // console.log("object");
    accessToken = localStorage?.getItem("accessToken");
  }

  const dispatch = useAppDispatch();

  const check = useCallback(() => {
    if (!isAuthenticated) {
      if (accessToken) {
        if (!isValidToken(accessToken)) {
          dispatch(logout());
        }
      }
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const loginPath = !isAdminLogin
        ? loginPaths.login
        : loginPaths.adminLogin;

      const href = `${loginPath}?${searchParams}`;
      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, accessToken, router, dispatch]);

  useEffect(() => {
    check();
  });

  if (!checked) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
