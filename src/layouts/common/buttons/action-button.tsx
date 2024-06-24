import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import React from "react";

interface ButtonProps {
  icon: string;
  onClick?: () => void;
}

const ActionButton = ({ icon, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="h-7 w-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border bg-gray-200 hover:bg-green-500 hover:text-white transition-all duration-300 disabled:hover:border-neutral-400  disabled:opacity-50 disabled:cursor-default "
      type="button"
    >
      <Icon icon={icon} className="text-lg" />
    </button>
  );
};

export default ActionButton;
