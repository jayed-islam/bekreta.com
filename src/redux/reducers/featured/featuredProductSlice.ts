import { RootState } from "@/redux/store";
import { IFeaturedProduct } from "@/types/featured-product";
import { IProduct } from "@/types/products";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface FeaturedProductState {
  products: IFeaturedProduct[];
  deliveryCharge: number;
  selectedDeliveryOption: string;
}

const initialState: FeaturedProductState = {
  products: [],
  deliveryCharge: 130,
  selectedDeliveryOption: "outsideDhaka",
};

export const featuredProductSlice = createSlice({
  name: "featuredProduct",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IFeaturedProduct>) => {
      const product = action.payload;
      const existingProduct = state.products.find(
        (p) => p.product._id === product.product._id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push(product);
      }
    },
    updateProductQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const product = state.products.find((p) => p.product._id === id);
      if (product) {
        product.quantity = quantity;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      if (state.products.length > 1) {
        state.products = state.products.filter(
          (p) => p.product._id !== action.payload
        );
        toast.success("Product removed successfully.");
      } else {
        toast.error("You must have at least one product in your cart");
      }
    },
    setFeaturedProduct: (state, action: PayloadAction<IProduct>) => {
      state.products = [
        {
          product: action.payload,
          quantity: 1,
        },
      ];
    },
    setDeliveryOption(state, action: PayloadAction<string>) {
      state.selectedDeliveryOption = action.payload;

      switch (action.payload) {
        case "insideDhaka":
          state.deliveryCharge = 70;
          break;
        case "outsideDhaka":
          state.deliveryCharge = 130;
          break;
        case "homeDelivery":
          state.deliveryCharge = 120;
          break;
        default:
          state.deliveryCharge = 70;
      }
    },
  },
});

export const {
  addProduct,
  updateProductQuantity,
  deleteProduct,
  setFeaturedProduct,
  setDeliveryOption,
} = featuredProductSlice.actions;

export default featuredProductSlice.reducer;

export const selectProducts = (state: RootState) =>
  state.featuredProduct.products;

export const selectDeliveryCharge = (state: RootState) =>
  state.cart.deliveryCharge;

export const selectSubtotal = createSelector(selectProducts, (products) =>
  products
    .reduce(
      (subtotal, product) =>
        subtotal + product.product.price * product.quantity,
      0
    )
    .toFixed(2)
);

export const selectTotalItems = createSelector(
  (state: RootState) => state.featuredProduct.products,
  (products) => products.reduce((total, product) => total + product.quantity, 0)
);

export const selectFeaturedOrderSubtotal = createSelector(
  selectProducts,
  (cartItems: IFeaturedProduct[]) => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
);

export const selectFeaturedOrderTotalPrice = createSelector(
  [selectFeaturedOrderSubtotal, selectDeliveryCharge],
  (subtotal, deliveryCharge) => {
    return subtotal + deliveryCharge;
  }
);
