"use client";

import { FC, ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useGetMeQuery } from "./reducers/auth/authApi";
import { isValidToken } from "@/auth/utils";
import { logout, setToken } from "./reducers/auth/authSlice";
import { usePathname } from "next/navigation";

interface IReudxProviderProps {
  children: ReactNode;
}

export const ReduxProvider: FC<IReudxProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <GLobalApiCallProvider>{children}</GLobalApiCallProvider>
    </Provider>
  );
};

const GLobalApiCallProvider: FC<IReudxProviderProps> = ({ children }) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const pathname = usePathname();

  const shouldSkip = pathname.includes("/featured");

  useGetMeQuery(undefined, {
    skip: shouldSkip || !(accessToken && isValidToken(accessToken)),
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage?.getItem("accessToken");
    if (token && isValidToken(token)) {
      dispatch(setToken(token));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  return <>{children}</>;
};
