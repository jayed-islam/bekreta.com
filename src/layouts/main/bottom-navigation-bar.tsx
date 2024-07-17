import React from "react";

import Link from "next/link";
import MiniSearchModal from "../common/modal/mini-search-modal";
import useBoolean from "@/hooks/use-boolean";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { paths } from "../paths";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openMenu } from "@/redux/reducers/menu/menuSlice";

const BottomNav = () => {
  const searchDialog = useBoolean();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleOpenMenu = () => {
    dispatch(openMenu());
  };
  return (
    <div className="fixed bottom-0 border-t border-gray-500 w-full lg:hidden z-20 bg-slate-900">
      <div className="flex items-center justify-between py-2 px-5">
        <Link
          href={`${
            user && user?._id ? paths.account.root : paths.website.signin
          }`}
          className="flex flex-col items-center"
        >
          <Icon icon="codicon:account" className="text-2xl text-white" />
          <h3 className="text-xs whitespace-nowrap text-gray-400">
            {user && user?._id ? "Account" : "Signin"}
          </h3>
        </Link>
        <div
          onClick={searchDialog.setTrue}
          className="flex flex-col items-center"
        >
          <Icon
            icon="iconamoon:search-light"
            className="text-2xl text-white cursor-pointer"
          />
          <h3 className="text-xs whitespace-nowrap text-gray-400">Search</h3>
        </div>
        <Link href={paths.featured}>
          <div className="flex flex-col items-center">
            <Icon icon="ph:gift-light" className="text-2xl text-white" />
            <h3 className="text-xs whitespace-nowrap text-gray-400">Offers</h3>
          </div>
        </Link>
        <div className="flex flex-col items-center" onClick={handleOpenMenu}>
          <Icon icon="ion:menu-outline" className="text-2xl text-white" />
          <h3 className="text-xs whitespace-nowrap text-gray-400">Menu</h3>
        </div>
      </div>

      <MiniSearchModal dialog={searchDialog} />
    </div>
  );
};

export default BottomNav;
