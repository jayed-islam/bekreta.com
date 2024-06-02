import React from "react";

interface Props {
  isLoading: boolean;
  uniqueBrandNames: string[];
}
const HeadFilterSectionView = ({ isLoading, uniqueBrandNames }: Props) => {
  return (
    <div className="bg-white pb-2 shadow-sm h-[49px]">
      <div className="max-w-6xl mx-auto grid grid-cols-4 md:grid-cols-10 lg:grid-cols-12 h-full justify-start items-center gap-x-3 px-5 xl:px-0">
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <div className="`px-3  h-7  rounded-full border border-gray-200 flex items-center justify-center text-sm cursor-pointer bg-gray-200"></div>
            ))}
          </>
        ) : (
          <>
            {uniqueBrandNames.map((brandName, index) => (
              <div
                key={index}
                // onClick={() => handleBrandClick(brandName)}
                className={`px-3 py-1 rounded-full border border-gray-200 flex white items-center justify-center text-sm cursor-pointer `}
              >
                {/* ${
                  selectedBrands.includes(brandName)
                    ? "bg-indigo-900 border-indigo-900 text-white"
                    : ""
                } */}
                {brandName}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default HeadFilterSectionView;
