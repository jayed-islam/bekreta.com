import Link from "next/link";
import React from "react";
import { paths } from "../paths";

interface NoDataProps {
  message: string;
}

const NoData: React.FC<NoDataProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-5 text-center bg-gray-100 rounded-lg">
      <p className="mb-3 text-lg font-semibold text-gray-700 max-w-[25rem]">
        {message}
      </p>
      <Link href={paths.product.category}>
        <button className="px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600">
          See Product
        </button>
      </Link>
    </div>
  );
};

export default NoData;
