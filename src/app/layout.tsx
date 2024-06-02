import "./globals.css";
import { ThemeProvider } from "../components/material-tailwind/material-tailwind-components";
import { Toaster } from "react-hot-toast";
import { Roboto_Condensed } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// const myFont = localFont({
//   src: "../../public/fonts/KFGQPC_Uthman_Taha_Naskh_Regular.ttf",
//   display: "swap",
//   variable: "--font-uthmani",
// });

const roboto_condensed = Roboto_Condensed({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto_condensed.className}>
      <body>
        {/* <ReduxProvider> */}
        <ThemeProvider>
          <div>{children}</div>
          <Toaster />
        </ThemeProvider>
        {/* </ReduxProvider> */}
      </body>
    </html>
  );
}
