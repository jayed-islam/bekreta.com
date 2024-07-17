import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button } from "@mui/material";
import Link from "next/link";
import { paths } from "@/layouts/paths";

const OrderSuccessView = () => {
  return (
    <div className="max-w-6xl mx-auto px-5 xl:px-0 py-16 md:py-24">
      <div className="flex items-center flex-col justify-center">
        <CheckCircleOutlineIcon sx={{ fontSize: 71, color: "green" }} />
        <h2 className="text-xl font-semibold text-center">
          Congrats!!! your Order Successfully Placed!
        </h2>
        <Link href={paths.account.orders}>
          <Button
            variant="contained"
            className="mt-5 bg-green-500 hover:bg-green-600"
          >
            See Order Status
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessView;
