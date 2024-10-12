"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Typography,
  Chip,
  Collapse,
} from "@mui/material";
import { Box } from "@mui/system";
import { useGetSingleOrderQuery } from "@/redux/reducers/order/orderApi";
import { OrderStatus } from "@/types/order";
import toast from "react-hot-toast";

// Dummy status colors based on status
const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.Pending:
      return "orange";
    case OrderStatus.Shipped:
      return "blue";
    case OrderStatus.Delivered:
      return "green";
    case OrderStatus.Cancelled:
      return "red";
    case OrderStatus.Confirmed:
      return "purple";
    default:
      return "gray";
  }
};

const OrderStatusView = () => {
  const [orderId, setOrderId] = useState<string>("");
  const [typeValue, setTypeValue] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const {
    data: orderData,
    isFetching,
    isError,
  } = useGetSingleOrderQuery(
    {
      id: orderId,
    },
    { skip: !orderId }
  );

  useEffect(() => {
    const urlOrderId = searchParams.get("id");
    if (urlOrderId) {
      setOrderId(urlOrderId);
    }
  }, [searchParams]);

  // Handle input change for order ID
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypeValue(e.target.value);
  };

  const handleGetData = () => {
    if (!typeValue) {
      toast.error("Please add an order ID");
      return; // Prevent submission if order ID is empty
    }
    setOrderId(typeValue);
  };

  const handleToggleRow = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  console.log("data", orderData?.data);

  return (
    <div className="bg-gray-100 py-16 px-5 xl:px-0">
      <div className="max-w-6xl mx-auto bg-white p-5 ">
        <Typography variant="h5" gutterBottom>
          অর্ডার ট্র্যাক করুন
        </Typography>
        <Typography variant="body2" gutterBottom>
          অর্ডার আইডি প্রবেশ করুন
        </Typography>

        <div className="max-w-xs">
          {/* Input field to enter order ID */}
          <TextField
            label="অর্ডার আইডি"
            value={typeValue} // Bind input value to typeValue
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </div>

        {/* Submit button */}
        <Button variant="contained" color="primary" onClick={handleGetData}>
          অর্ডার ট্র্যাক করুন
        </Button>

        {/* Show loading state */}
        {isFetching && (
          <Typography variant="h6" color="primary" sx={{ marginTop: 2 }}>
            লোড হচ্ছে...
          </Typography>
        )}

        {isError && (
          <Typography variant="h6" color="error" sx={{ marginTop: 2 }}>
            কোন অর্ডার পাওয়া যায়নি
          </Typography>
        )}

        {/* Show order data if available */}
        {!isFetching && orderData?.data && (
          <TableContainer component={Paper} sx={{ marginTop: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    Phone
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    অর্ডার আইডি
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    মোট মূল্য
                  </TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>স্ট্যাটাস</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{orderData?.data._id}</TableCell>
                  <TableCell>{orderData?.data.name}</TableCell>
                  <TableCell>{orderData?.data.phone}</TableCell>
                  <TableCell>
                    ৳{orderData?.data.totalPrice.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {new Date(
                        orderData?.data.createdAt as Date
                      ).toLocaleString()}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={orderData?.data.status}
                      style={{
                        backgroundColor: getStatusColor(
                          orderData?.data.status as OrderStatus
                        ),
                        color: "white",
                      }}
                    />
                  </TableCell>

                  {/* Action buttons */}
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {/* <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                      >
                        অর্ডার বাতিল করুন
                      </Button> */}
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleToggleRow(0)}
                      >
                        বিস্তারিত দেখুন
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={4}>
                    <Collapse in={expanded === 0} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Typography variant="h6">পণ্যের বিস্তারিত:</Typography>
                        <Table size="small" aria-label="products">
                          <TableHead>
                            <TableRow>
                              <TableCell>পণ্যের নাম</TableCell>
                              <TableCell>পরিমাণ</TableCell>
                              <TableCell>মূল্য</TableCell>

                              <TableCell>পণ্যের আইডি</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {orderData?.data.products.map((product, index) => (
                              <TableRow key={index}>
                                <TableCell>{product.product.name}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>{product.price} ৳</TableCell>
                                <TableCell>{product.product._id}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default OrderStatusView;
