"use client";

import { useAppSelector } from "@/redux/hooks";
import { useGetUserOrderByIdQuery } from "@/redux/reducers/order/orderApi";
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import OrderRow from "../order-row";
import { ICreateOrder, IOrder } from "@/types/order";

const UserOrderView = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetUserOrderByIdQuery(user?._id as string, {
    skip: !user?._id,
  });

  if (isLoading) {
    return <CircularProgress />;
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
