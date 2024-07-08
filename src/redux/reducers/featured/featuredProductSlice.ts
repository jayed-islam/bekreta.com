import { RootState } from "@/redux/store";
import { IFeaturedProduct } from "@/types/featured-product";
import { IProduct } from "@/types/products";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface FeaturedProductState {
  products: IFeaturedProduct[];
  selectedDistrict: string;
}

const initialState: FeaturedProductState = {
  products: [],
  selectedDistrict: "",
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
        // Check if the product already exists
        toast.error("This product is already in your cart");
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
        toast.success("Product deleted successfully.");
      } else {
        toast.error("You must have at least one product in your cart");
      }
    },
    setDistrictName: (state, action: PayloadAction<string>) => {
      state.selectedDistrict = action.payload;
    },
    setFeaturedProduct: (state, action: PayloadAction<IProduct>) => {
      state.products = [
        {
          product: action.payload,
          quantity: 1,
        },
      ];
    },
  },
});

export const {
  addProduct,
  updateProductQuantity,
  deleteProduct,
  setDistrictName,
  setFeaturedProduct,
} = featuredProductSlice.actions;

export default featuredProductSlice.reducer;

export const selectProducts = (state: RootState) =>
  state.featuredProduct.products;
export const selectSelectedDistrict = (state: RootState) =>
  state.featuredProduct.selectedDistrict;

export const selectSubtotal = createSelector(selectProducts, (products) =>
  products
    .reduce(
      (subtotal, product) =>
        subtotal + product.product.price * product.quantity,
      0
    )
    .toFixed(2)
);

export const selectShippingFee = createSelector(
  selectSelectedDistrict,
  (district) => {
    // console.log("district", district);
    return district === "1" ? 71 : 110;
  }
);

export const selectTotal = createSelector(
  selectSubtotal,
  selectShippingFee,
  (subtotal, shippingFee) => (parseFloat(subtotal) + shippingFee).toFixed(2)
);

export const selectTotalItems = createSelector(
  (state: RootState) => state.featuredProduct.products,
  (products) => products.reduce((total, product) => total + product.quantity, 0)
);
