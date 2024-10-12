"use client";

import { useAppSelector } from "@/redux/hooks";
import { useGetUserOrderByIdQuery } from "@/redux/reducers/order/orderApi";
import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import OrderRow from "../order-row";
import { IOrder } from "@/types/order";
import { useRouter } from "next/navigation";
import { paths } from "@/layouts/paths";

const UserOrderView = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetUserOrderByIdQuery(user?._id as string, {
    skip: !user?._id,
  });

  const router = useRouter();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!data?.data.length) {
    return (
      <div className="text-center my-8">
        <Typography variant="h6" gutterBottom>
          No orders found
        </Typography>
        <Button
          variant="contained"
          color="success"
          sx={{
            textTransform: "capitalize",
          }}
          onClick={() => router.push(paths.product.products)}
        >
          Shop Now
        </Button>
      </div>
    );
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>User Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((order: IOrder) => (
              <OrderRow key={order._id} row={order} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserOrderView;
