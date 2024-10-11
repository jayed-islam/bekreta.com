import React from "react";

const HomeCategorySSRLoading = () => {
  return (
    <div className="py-3 md:py-5 bg-gray-100">
      <div className="max-w-6xl mx-auto px-5 xl:px-0">
        <div className="animate-pulse md:hidden flex flex-wrap gap-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div className=" bg-slate-200 h-7 w-20"></div>
          ))}
        </div>
        <div className="animate-pulse hidden md:flex gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div className=" bg-slate-200 h-10 w-32"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCategorySSRLoading;
