"use client";

import React from "react";

import Typography from "@mui/material/Typography";
import Image from "next/image";
import logo from "../../../public/assets/logo.jpg";
import Link from "next/link";
import { paths } from "@/layouts/paths";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

interface Props {
  window?: () => Window;
}

export default function Header(props: Props) {
  return (
    <div className="bg-gray-100 pb-3">
      <div className="border-b shadow-sm bg-white">
        <div className="max-w-6xl mx-auto py-2 md:py-2.5 px-5 xl:px-0 flex items-center justify-between">
          <Link href={paths.root}>
            <Image src={logo} alt="" className="w-24 rounded-lg" />
          </Link>
          <div className="flex items-center gap-2 md:gap-5 flex-col md:flex-row">
            <div className="px-5 py-1 rounded-full bg-gray-100 text-md font-semibold flex items-center gap-2 border">
              <Icon icon="line-md:phone-call-loop" />
              +8801954057920
            </div>
            <div className="px-5 py-1 rounded-full bg-gray-100 text-md font-semibold flex items-center gap-2 border">
              <Icon icon="line-md:phone-call" />
              +8801954057920
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
