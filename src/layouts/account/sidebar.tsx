import React from "react";
import { accountConfings } from "./config-navigation";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Link from "next/link";

const AccountSidebar = () => {
  return (
    <div className="w-[16rem] bg-white px-3 rounded-2xl pt-5 pb-7">
      <div className="relative overflow-hidden flex flex-col items-center justify-center">
        <img
          alt="avatar"
          loading="lazy"
          width="128"
          height="128"
          decoding="async"
          data-nimg="1"
          className="w-24 h-24 rounded-full object-cover z-0"
          src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg"
        />
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-bold leading-5 mt-3">Abdullah Khan</h2>
          <h3>user@gmail.com</h3>
        </div>
      </div>
      <div className="mt-7 flex flex-col gap-3">
        {accountConfings.map((item, index) => (
          <Link
            href={item.path}
            key={index}
            className="px-5 py-2 hover:bg-gray-100 rounded-md flex items-center gap-3"
          >
            <Icon icon={item.icon} className="text-xl" />
            <h2 className="text-md">{item.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AccountSidebar;
