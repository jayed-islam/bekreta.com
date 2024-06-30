import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import cartSlice from "./reducers/cart/cartSlice";
import productSlice from "./reducers/product/productSlice";
import categorySlice from "./reducers/category/categorySlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    category: categorySlice,
    product: productSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
