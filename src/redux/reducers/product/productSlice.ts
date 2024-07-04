import { CartItem } from "@/types/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  lastVisitedProducts: CartItem[];
}

const initialState: ProductState = {
  lastVisitedProducts: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addLastVisitedProduct(state, action: PayloadAction<CartItem>) {
      state.lastVisitedProducts = state.lastVisitedProducts.filter(
        (p) => p.productId !== action.payload.productId
      );

      state.lastVisitedProducts.unshift(action.payload);

      if (state.lastVisitedProducts.length > 3) {
        state.lastVisitedProducts = state.lastVisitedProducts.slice(0, 3);
      }
      localStorage.setItem(
        "lastVisitedProducts",
        JSON.stringify(state.lastVisitedProducts)
      );
    },
    setLastVisitedProducts(state, action: PayloadAction<CartItem[]>) {
      state.lastVisitedProducts = action.payload;
    },
  },
});

export const { addLastVisitedProduct, setLastVisitedProducts } =
  productSlice.actions;

export default productSlice.reducer;
