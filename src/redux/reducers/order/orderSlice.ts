import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {}

const initialState: OrderState = {};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
