import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Roboto_Condensed } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CssBaseline } from "@mui/material";
import { ReduxProvider } from "@/redux/ReduxProvider";
import { Metadata } from "next";
import Favicon from "../../public/favicon.jpeg";

const roboto_condensed = Roboto_Condensed({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bekreta",
  description:
    "Discover a wide range of products at the best prices. Shop now for electronics, fashion, home goods, and more on Bekreta",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto_condensed.className}>
      <body>
        <CssBaseline />
        <ReduxProvider>
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
