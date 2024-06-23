"use client";

import { FC, ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { useAppDispatch, useAppSelector } from "./hooks";
// import { useGetUserDataQuery } from "./reducer/auth/authApi";
// import { isValidToken } from "@/auth/utils";
// import { logOut, setToken } from "./reducer/auth/authSlice";

interface IReudxProviderProps {
  children: ReactNode;
}

export const ReduxProvider: FC<IReudxProviderProps> = ({ children }) => (
  <Provider store={store}>
    <GLobalApiCallProvider> {children}</GLobalApiCallProvider>
  </Provider>
);

const GLobalApiCallProvider: FC<IReudxProviderProps> = ({ children }) => {
  //   const { accessToken } = useAppSelector((state) => state.auth);

  //   useGetUserDataQuery(undefined, {
  //     skip: !(accessToken && isValidToken(accessToken)),
  //   });

  //   const dispatch = useAppDispatch();

  //   useEffect(() => {
  //     const token = localStorage?.getItem("accessToken");
  //     if (token && isValidToken(token)) {
  //       dispatch(setToken(token));
  //     } else {
  //       dispatch(logOut());
  //     }
  //   }, [dispatch]);

  return <>{children}</>;
};
