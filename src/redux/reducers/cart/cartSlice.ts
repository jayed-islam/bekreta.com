import { RootState } from "@/redux/store";
import { CartItem } from "@/types/cart";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";

interface cartState {
  isCartDrawerOpen: boolean;
  cartItems: CartItem[];
  district: string;
  deliveryCharge: number;
  selectedDeliveryOption: string;
}

const initialState: cartState = {
  isCartDrawerOpen: false,
  cartItems: [],
  district: "",
  deliveryCharge: 70,
  selectedDeliveryOption: "insideDhaka",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCartDrawer(state) {
      state.isCartDrawerOpen = true;
    },
    closeCartDrawer(state) {
      state.isCartDrawerOpen = false;
    },
    toggleCartDrawer(state) {
      state.isCartDrawerOpen = !state.isCartDrawerOpen;
    },
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.cartItems = action.payload;
    },
    addToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.productId === newItem.productId
      );

      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const productIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== productIdToRemove
      );

      // Update localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateCartItemQuantity(
      state,
      action: PayloadAction<{ productId: string; increment: boolean }>
    ) {
      const { productId, increment } = action.payload;
      const cartItem = state.cartItems.find(
        (item) => item.productId === productId
      );

      if (cartItem) {
        if (increment) {
          cartItem.quantity += 1;
        } else {
          if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
          }
        }

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
    // setDistrictId(state, action: PayloadAction<string>) {
    //   state.district = action.payload;
    //   state.deliveryCharge = action.payload.toLowerCase() === "1" ? 70 : 121;
    // },
    setDeliveryOption(state, action: PayloadAction<string>) {
      state.selectedDeliveryOption = action.payload;

      // Update the delivery charge based on the selected delivery option
      switch (action.payload) {
        case "insideDhaka":
          state.deliveryCharge = 70;
          break;
        case "outsideDhaka":
          state.deliveryCharge = 120;
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
  openCartDrawer,
  closeCartDrawer,
  toggleCartDrawer,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  setCartItems,
  setDeliveryOption,
} = cartSlice.actions;

export default cartSlice.reducer;

const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectDeliveryCharge = (state: RootState) =>
  state.cart.deliveryCharge;

export const selectCartTotalItems = createSelector(
  selectCartItems,
  (cartItems: CartItem[]) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }
);

export const isItemInCart = (productId: string) =>
  createSelector(selectCartItems, (cartItems) =>
    cartItems.some((item) => item.productId === productId)
  );

export const selectCartSubtotal = createSelector(
  selectCartItems,
  (cartItems: CartItem[]) => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
);

export const selectCartTotalPrice = createSelector(
  [selectCartSubtotal, selectDeliveryCharge],
  (subtotal, deliveryCharge) => {
    return subtotal + deliveryCharge;
  }
);
