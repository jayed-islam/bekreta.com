"use client";

import React, { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button, useMediaQuery, IconButton, Tooltip } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { paths } from "@/layouts/paths";

const OrderSuccessSSRLoading = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    }
  };

  const handleOrderStatusClick = () => {
    router.push(`${paths.orderTrucking}?id=${orderId}`);
  };

  return (
    <div className="bg-gray-100 px-5 xl:px-0 py-16">
      <div className="max-w-6xl mx-auto py-16 md:py-24 bg-white p-5 border shadow">
        <div className="flex items-center flex-col justify-center">
          <CheckCircleOutlineIcon
            sx={{ fontSize: isMobile ? 55 : 71, color: "green" }}
          />
          <h2 className="text-xl font-semibold text-center mt-5">
            অভিনন্দন!!! আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে!
          </h2>

          <div>
            <div className="flex items-center mt-4">
              <span className="text-lg font-medium">
                আপনার অর্ডার আইডি: {orderId}
              </span>
              <Tooltip title={isCopied ? "Copied!" : "Copy Order ID"} arrow>
                <IconButton onClick={handleCopyOrderId}>
                  {isCopied ? (
                    <CheckIcon sx={{ color: "green" }} />
                  ) : (
                    <ContentCopyIcon />
                  )}
                </IconButton>
              </Tooltip>
            </div>
            {isCopied && (
              <p className="text-primary text-center">
                অর্ডার আইডি কপি হয়েছে!
              </p>
            )}
            <div className="flex gap-4 mt-6 flex-col md:flex-row">
              <div>
                <h1>Invoice creation loading....</h1>
              </div>

              <Button
                variant="contained"
                color="success"
                onClick={handleOrderStatusClick}
              >
                অর্ডার স্ট্যাটাস দেখুন
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessSSRLoading;
