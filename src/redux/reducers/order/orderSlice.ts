import { CartItem } from "@/types/cart";
import { createSlice } from "@reduxjs/toolkit";

interface OrderState {
  lastVisitedProducts: CartItem[];
}

const initialState: OrderState = {
  lastVisitedProducts: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
