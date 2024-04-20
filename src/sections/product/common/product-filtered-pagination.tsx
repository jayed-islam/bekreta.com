import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React from "react";

interface PaginationProps {
  page: number;
  pages: number;
  handlePrevClick: () => void;
  handleNextClick: () => void;
  handleLastPageClick: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  pages,
  handlePrevClick,
  handleNextClick,
  handleLastPageClick,
}) => {
  const renderPageButtons = () => {
    const visiblePages = 3;
    const buttons = [];

    if (pages <= visiblePages) {
      for (let number = 0; number < pages; number++) {
        buttons.push(
          <button
            key={number}
            className={`px-4 py-2 text-sm text-black font-semibold rounded-md hover:bg-blue-600 hover:text-white ${
              page === number && "bg-blue-500 text-white"
            }`}
            onClick={() => console.log("Go to page:", number + 1)}
          >
            {number + 1}
          </button>
        );
      }
    } else {
      const startRange = Math.min(
        Math.max(0, page - Math.floor(visiblePages / 2)),
        pages - visiblePages
      );
      const endRange = startRange + visiblePages;

      if (startRange > 0) {
        buttons.push(
          <span key="ellipsis-start" className="text-gray-700">
            ...
          </span>
        );
      }

      for (let number = startRange; number < endRange; number++) {
        buttons.push(
          <button
            key={number}
            className={`px-4 py-2 text-sm text-black font-semibold rounded-md hover:bg-blue-600 hover:text-white ${
              page === number && "bg-blue-500 text-white"
            }`}
            onClick={() => console.log("Go to page:", number + 1)}
          >
            {number + 1}
          </button>
        );
      }

      if (endRange < pages) {
        buttons.push(
          <span key="ellipsis-end" className="text-gray-700">
            ...
          </span>
        );
      }
    }

    return buttons;
  };

  return (
    <div className="flex items-center justify-between mt-11">
      <button
        disabled={page === 0}
        onClick={handlePrevClick}
        className={`flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 ${
          page === 0 ? "cursor-not-allowed" : undefined
        }`}
      >
        <span>previous</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
      </button>

      <div className="hidden md:flex items-center gap-5">
        <div>
          <h3 className="text-md">
            Showing <span className="font-bold">{page * 5 + 1}</span> to{" "}
            <span className="font-bold">{Math.min((page + 1) * 5, 10)}</span> of{" "}
            <span className="font-bold text-blue-700">10</span> entries
          </h3>
        </div>
        <div className="items-center hidden md:flex gap-x-3">
          {renderPageButtons()}
        </div>
        <div className="relative">
          <select
            className="border py-1.5 px-1 w-11 rounded outline-none appearance-none bg-transparent "
            value={5}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 ">
            <svg
              className="fill-current h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 12L6 8h8l-4 4z" />
            </svg>
          </div>
        </div>
        <button
          onClick={handleLastPageClick}
          className={`border py-2.5 px-1 w-11 rounded outline-none hover:bg-gray-100 flex items-center justify-center ${
            page === pages - 1 ? "cursor-not-allowed" : undefined
          }`}
        >
          <Icon
            icon="solar:double-alt-arrow-right-linear"
            className="text-xl"
          />
        </button>
      </div>

      <button
        disabled={page === 1}
        onClick={handleNextClick}
        className={`flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 ${
          page === 1 ? "cursor-not-allowed" : undefined
        }`}
      >
        <span>Next</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
