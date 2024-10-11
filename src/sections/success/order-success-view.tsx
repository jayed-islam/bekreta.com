"use client";

import React, { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button, useMediaQuery, IconButton, Tooltip } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check"; // New success icon
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoiceDocument from "./order-invoice-view";
import { useGetSingleOrderQuery } from "@/redux/reducers/order/orderApi";
import { IOrder } from "@/types/order";
import { paths } from "@/layouts/paths";

const OrderSuccessView = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const router = useRouter();
  const { data, isLoading } = useGetSingleOrderQuery(orderId as string);

  // Responsive view hook
  const isMobile = useMediaQuery("(max-width:600px)");

  // State for copy status
  const [isCopied, setIsCopied] = useState(false);

  // Copy order ID to clipboard and show success icon
  const handleCopyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000); // Reset icon after 3 seconds
    }
  };

  // Button handlers
  const handleOrderStatusClick = () => {
    router.push(`${paths.account.orders}/${orderId}`);
  };

  if (isLoading) return <div>Loading...</div>;

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

          {/* Display Order ID with Copy button */}
          <div className="flex items-center mt-4">
            <span className="text-lg font-medium">
              আপনার অর্ডার আইডি: {orderId}
            </span>
            <Tooltip title={isCopied ? "Copied!" : "Copy Order ID"} arrow>
              <IconButton onClick={handleCopyOrderId}>
                {isCopied ? (
                  <CheckIcon sx={{ color: "green" }} /> // Show check icon after copying
                ) : (
                  <ContentCopyIcon />
                )}
              </IconButton>
            </Tooltip>
          </div>

          {isCopied && (
            <p className="text-green-700 mt-2">অর্ডার আইডি কপি হয়েছে!</p>
          )}

          {/* Buttons for Invoice Download and Order Status */}
          <div className="flex gap-4 mt-6 flex-col md:flex-row">
            <PDFDownloadLink
              document={<InvoiceDocument order={data?.data as IOrder} />}
              fileName={`invoice-${orderId}.pdf`}
              className="no-underline"
            >
              <Button variant="contained" color="secondary">
                Invoice ডাউনলোড করুন
              </Button>
            </PDFDownloadLink>

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
  );
};

export default OrderSuccessView;
