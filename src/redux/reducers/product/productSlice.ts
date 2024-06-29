import { createSlice } from "@reduxjs/toolkit";

interface ProductState {}

const initialState: ProductState = {};

// Define the product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productSlice.reducer;
