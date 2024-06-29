import {
  IFeaturedProductGetBody,
  IGetProductListResponse,
  IProduct,
  IProductGetBody,
} from "@/types/products";
import { api } from "../../api";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IGetProductListResponse, IProductGetBody>({
      query: (body: IProductGetBody) => ({
        url: "/product/get-list",
        method: "POST",
        body,
      }),
    }),
    getProductById: builder.query<IProduct, string>({
      query: (id) => ({
        url: `product/${id}`,
        method: "GET",
      }),
    }),
    getFeaturedProducts: builder.query<
      IGetProductListResponse,
      IFeaturedProductGetBody
    >({
      query: (body) => ({
        url: "product/featured",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetFeaturedProductsQuery,
} = productApi;
