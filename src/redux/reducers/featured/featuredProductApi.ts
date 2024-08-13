import { IProduct } from "@/types/products";
import { api } from "../../api";
import { ICreateOfferedOrder, ICreateOrder } from "@/types/order";

interface IGetFeaturedProduct {
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
    getFeaturedOrder: builder.query<IGetFeaturedProduct, void>({
      query: () => ({
        url: "/product/get-featured",
        method: "GET",
      }),
    }),
    createFeaturedOrder: builder.mutation<
      IGetCreateOfferedOrderResponse,
      ICreateOfferedOrder
    >({
      query: (body: ICreateOfferedOrder) => ({
        url: "/featured-order",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetFeaturedOrderQuery, useCreateFeaturedOrderMutation } =
  featuredProductApi;
