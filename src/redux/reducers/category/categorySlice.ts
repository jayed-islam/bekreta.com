import { createSlice } from "@reduxjs/toolkit";

interface CategoryState {}

const initialState: CategoryState = {};

// Define the category slice
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
});

export default categorySlice.reducer;
