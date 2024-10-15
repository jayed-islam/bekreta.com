"use client";

import React, { useState } from "react";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button, useMediaQuery, IconButton, Tooltip } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { useGetSingleOrderQuery } from "@/redux/reducers/order/orderApi";
import { IOrder } from "@/types/order";
import { paths } from "@/layouts/paths";
import InvoiceDownloadButton from "./order-invoice-view";
import Invoice from "./invoice";
import generatePDF, { Resolution, Margin, Options } from "react-to-pdf";

const getTargetElement = () => document.getElementById("invoiceDoc");

const OrderSuccessView = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const router = useRouter();
  const { data, isLoading } = useGetSingleOrderQuery({ id: orderId as string });

  const isMobile = useMediaQuery("(max-width:600px)");
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

  const options: Options = {
    filename: `invoice-${data?.data?._id}.pdf`,
    method: "save",
    resolution: Resolution.MEDIUM,

    page: {
      margin: Margin.NONE,
      format: "A4",
      orientation: "portrait",
    },
    canvas: {
      mimeType: "image/jpeg",
      qualityRatio: 0.6,
    },
    overrides: {
      pdf: {
        compress: true,
      },
      canvas: {
        useCORS: false,
      },
    },
  };

  const downloadPdf = () => {
    generatePDF(getTargetElement, options);
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
              <div className="w-full">
                {isCopied && (
                  <p className="text-primary text-center">
                    অর্ডার আইডি কপি হয়েছে!
                  </p>
                )}
              </div>
              <div className="flex gap-4 mt-6 flex-col md:flex-row items-center justify-center">
                {isLoading ? (
                  <span className="text-md font-medium h-11">
                    অর্ডার বিস্তাতির লোড হচ্ছে...
                  </span>
                ) : (
                  <div>
                    {data?.data && (
                      <InvoiceDownloadButton order={data?.data as IOrder} />
                    )}
                    <Button onClick={downloadPdf}>Doalding</Button>
                  </div>
                )}

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
      {/* {data?.data && } */}
      <Invoice order={data?.data as IOrder} />
    </div>
  );
};

export default OrderSuccessView;
