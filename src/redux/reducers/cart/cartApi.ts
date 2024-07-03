import { ICategoriesResponse } from "@/types/category";
import { api } from "../../api";
import { ICartResponse, IUserCartResponse } from "@/types/cart";
import { setCartItems } from "./cartSlice";

interface IAddToCart {
  item: {
    product: string;
    quantity: number;
  };
}

interface IUpdateQuantity {
  productId: string;
  action: "increase" | "decrease";
}

interface IRemoveItemResponse {
  success: boolean;
  message: string;
  data: {
    product: string;
    quantity: number;
  };
}

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation<ICartResponse, IAddToCart>({
      query: (cartItem) => ({
        url: `/cart`,
        method: "POST",
        body: cartItem,
      }),
      invalidatesTags: ["user-carts"],
    }),
    removeFromCart: builder.mutation<IRemoveItemResponse, string>({
      query: (productId) => ({
        url: `/cart/remove/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user-carts"],
    }),
    clearCart: builder.mutation<void, void>({
      query: () => ({
        url: `/cart`,
        method: "DELETE",
      }),
    }),
    updateCartItemQuantity: builder.mutation<ICartResponse, IUpdateQuantity>({
      query: (body) => ({
        url: `/cart/update-quantity`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["user-carts"],
    }),
    getUserCarts: builder.query<IUserCartResponse, string>({
      query: (userId) => ({
        url: `/cart/${userId}`,
        method: "GET",
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            dispatch(setCartItems(data.data.products));
          }
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["user-carts"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useGetUserCartsQuery,
  useUpdateCartItemQuantityMutation,
} = cartApi;
