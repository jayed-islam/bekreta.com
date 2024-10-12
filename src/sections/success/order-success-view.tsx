"use client";

import React, { useState } from "react";
import {
  PDFDownloadLink,
  Document,
  Page as PDFPage,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button, useMediaQuery, IconButton, Tooltip } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { useGetSingleOrderQuery } from "@/redux/reducers/order/orderApi";
import { IOrder } from "@/types/order";
import { paths } from "@/layouts/paths";

const OrderSuccessView = () => {
  const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontSize: 12,
      lineHeight: 1.5,
      fontFamily: "Helvetica",
    },
    header: {
      borderBottom: "1px solid #000",
      marginBottom: 10,
      paddingBottom: 5,
    },
    title: {
      fontSize: 18,
      textAlign: "center",
      fontWeight: "bold",
    },
    section: {
      marginBottom: 10,
    },
    subTitle: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 5,
    },
    productRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 5,
    },
    productIndex: {
      width: "5%",
    },
    productName: {
      width: "45%",
    },
    productQuantity: {
      width: "25%",
    },
    productPrice: {
      width: "25%",
    },
    totalSection: {
      borderTop: "1px solid #000",
      paddingTop: 10,
      marginTop: 10,
    },
    totalText: {
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "right",
    },
  });

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

  const InvoiceDocument: React.FC<{ order: IOrder }> = ({ order }) => {
    return (
      <Document>
        <PDFPage style={styles.page}>
          {" "}
          {/* Use the renamed component here */}
          <View style={styles.header}>
            <Text style={styles.title}>Order Invoice</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subTitle}>Order Information:</Text>
            <Text>Order ID: {order._id}</Text>
            <Text>
              Order Date:{" "}
              {new Date(order.createdAt as Date).toLocaleDateString("en-US")}
            </Text>
            <Text>Total Price: ${order.totalPrice.toFixed(2)}</Text>
            <Text>Order Number: {order._id}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subTitle}>Customer Information:</Text>
            <Text>Name: {order.name}</Text>
            <Text>Phone: {order.phone}</Text>
            <Text>Address: {order.address}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subTitle}>Ordered Product Information:</Text>
            {order.products.map((product, index) => (
              <View key={product.product._id} style={styles.productRow}>
                <Text style={styles.productIndex}>{index + 1}.</Text>
                <Text style={styles.productName}>{product.product._id}</Text>
                <Text style={styles.productQuantity}>
                  Quantity: {product.quantity}
                </Text>
                <Text style={styles.productPrice}>
                  Price: ${product.price.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.totalSection}>
            <Text style={styles.totalText}>Total: {order.totalPrice}</Text>
          </View>
        </PDFPage>
      </Document>
    );
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
            {isLoading ? (
              <div className=" p-11">
                <span className="text-md font-medium">
                  অর্ডার বিস্তাতির লোড হচ্ছে...
                </span>
              </div>
            ) : (
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
                  <p className="text-green-700 mt-2">অর্ডার আইডি কপি হয়েছে!</p>
                )}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessView;
