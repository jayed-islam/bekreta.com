import { IProduct } from "@/types/products";
import { api } from "../../api";
import { ICreateOfferedOrder, ICreateOrder } from "@/types/order";

interface IGetStatusWiseFeaturedProduct {
  message: string;
  state: boolean;
  data: IProduct;
}

interface IGetCreateOfferedOrderResponse {
  message: string;
  success: boolean;
  data: IProduct;
}

export const featuredProductApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStatusWiseFeaturedProducts: builder.query<
      IGetStatusWiseFeaturedProduct,
      void
    >({
      query: () => ({
        url: "/product/type/featured",
        method: "GET",
      }),
    }),
    createFeaturedOrder: builder.mutation<
      IGetCreateOfferedOrderResponse,
      ICreateOfferedOrder
    >({
      query: (body: ICreateOfferedOrder) => ({
        url: "/offered",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetStatusWiseFeaturedProductsQuery,
  useCreateFeaturedOrderMutation,
} = featuredProductApi;
