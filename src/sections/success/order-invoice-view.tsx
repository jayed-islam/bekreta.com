"use client";

import React, { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { IOrder } from "@/types/order";
import { Button } from "@mui/material";

interface Props {
  order: IOrder;
}

const InvoiceDownloadButton = ({ order }: Props) => {
  const InvoiceDocument = () => {
    return (
      <Document>
        <Page style={styles.page}>
          {/* Invoice Title */}
          <View style={styles.header}>
            <Text style={styles.title}>Order Invoice</Text>
          </View>

          {/* Order Information */}
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

          {/* Customer Information */}
          <View style={styles.section}>
            <Text style={styles.subTitle}>Customer Information:</Text>
            <Text>Name: {order.name}</Text>
            <Text>Phone: {order.phone}</Text>
            <Text>Address: {order.address}</Text>
          </View>

          {/* Product Information */}
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

          {/* Total */}
          <View style={styles.totalSection}>
            <Text style={styles.totalText}>Total: {order.totalPrice}</Text>
          </View>
        </Page>
      </Document>
    );
  };

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
  return (
    <PDFDownloadLink
      document={<InvoiceDocument />}
      fileName={`invoice-${order._id}.pdf`}
      className="no-underline"
    >
      <Button variant="contained" color="secondary">
        Invoice ডাউনলোড করুন
      </Button>
    </PDFDownloadLink>
  );
};

export default InvoiceDownloadButton;
