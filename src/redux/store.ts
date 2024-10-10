import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import cartSlice from "./reducers/cart/cartSlice";
import productSlice from "./reducers/product/productSlice";
import categorySlice from "./reducers/category/categorySlice";
import authSlice from "./reducers/auth/authSlice";
import featuredProductSlice from "./reducers/featured/featuredProductSlice";
import menuSlice from "./reducers/menu/menuSlice";
import orderSlice from "./reducers/order/orderSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    category: categorySlice,
    product: productSlice,
    auth: authSlice,
    featuredProduct: featuredProductSlice,
    menu: menuSlice,
    order: orderSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
