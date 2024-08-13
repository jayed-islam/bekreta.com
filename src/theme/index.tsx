"use client";

import { useMemo } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import NextAppDirEmotionCacheProvider from "./next-emotion-cacsh-provider";

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#9c27b0",
          },
        },
      }),
    []
  );

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
