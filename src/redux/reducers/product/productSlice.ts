import { CartItem } from "@/types/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  lastVisitedProducts: CartItem[];
}

const initialState: ProductState = {
  lastVisitedProducts: [],
};

const loadLastVisitedProducts = (): CartItem[] => {
  const storedProducts = localStorage.getItem("lastVisitedProducts");
  return storedProducts ? JSON.parse(storedProducts) : [];
};

const saveLastVisitedProducts = (products: CartItem[]) => {
  localStorage.setItem("lastVisitedProducts", JSON.stringify(products));
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addLastVisitedProduct(state, action: PayloadAction<CartItem>) {
      // Load existing products from local storage
      let lastVisitedProducts = loadLastVisitedProducts();

      // Remove any existing product with the same ID
      lastVisitedProducts = lastVisitedProducts.filter(
        (p) => p.productId !== action.payload.productId
      );

      // Add the new product to the beginning of the array
      lastVisitedProducts.unshift(action.payload);

      // Ensure only the latest 3 products are stored
      if (lastVisitedProducts.length > 3) {
        lastVisitedProducts.pop();
      }

      // Update state
      state.lastVisitedProducts = lastVisitedProducts;

      // Save updated products to local storage
      saveLastVisitedProducts(lastVisitedProducts);
    },
    setLastVisitedProducts(state, action: PayloadAction<CartItem[]>) {
      state.lastVisitedProducts = action.payload;
    },
  },
});

export const { addLastVisitedProduct, setLastVisitedProducts } =
  productSlice.actions;

export default productSlice.reducer;
