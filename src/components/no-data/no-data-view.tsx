import Link from "next/link";
import React from "react";

const NoDataFoundView = () => {
  return (
    <div className="w-full px-3 sm:px-0 py-11">
      <div className="border border-blue-400 px-5 py-2 mb-7">
        <h1>
          No product found in the{" "}
          <span className="font-semibold text-red-400">{}</span> category.
        </h1>
      </div>

      <Link
        href="/"
        className=" bg-green-500 px-5 text-sm font-semibold py-2 rounded-full"
      >
        RETURN TO SHOP
      </Link>
    </div>
  );
};

export default NoDataFoundView;
