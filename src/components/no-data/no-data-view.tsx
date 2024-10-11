import { paths } from "@/layouts/paths";
import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

interface Props {
  category?: string;
  resetFilter: () => void;
}

const NoDataFoundView = ({ category, resetFilter }: Props) => {
  return (
    <div className="w-full px-3 sm:px-0 py-11">
      <div className="border border-green-500 px-5 py-2 mb-7">
        <h1>
          No product found in the{" "}
          <span className="font-semibold text-green-500">{category}</span>{" "}
          category.
        </h1>
      </div>

      <Button
        onClick={resetFilter}
        color="success"
        variant="contained"
        sx={{
          textTransform: "capitalize",
        }}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default NoDataFoundView;
