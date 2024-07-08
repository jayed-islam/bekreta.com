import { IProduct } from "@/types/products";
import { api } from "../../api";

interface IGetStatusWiseFeaturedProduct {
  message: string;
  state: boolean;
  data: IProduct;
}

export const featuredProductApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStatusWiseFeaturedProducts: builder.query<
      IGetStatusWiseFeaturedProduct,
      void
    >({
      query: () => ({
        url: "/product/status/featured",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetStatusWiseFeaturedProductsQuery } = featuredProductApi;
