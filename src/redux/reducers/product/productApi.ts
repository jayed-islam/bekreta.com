import {
  IFeaturedProductGetBody,
  IGetCategoryWiseProductListResponse,
  IGetFeaturedProductResponse,
  IGetHomeItemProductListResponse,
  IGetProductListResponse,
  IGetSingleAndRelatedProductListResponse,
  IOfferedProductGetBody,
  IProduct,
  IProductGetBody,
} from "@/types/products";
import { api } from "../../api";

interface IGetSingleProductResponse {
  data: IProduct;
  message: string;
  state: boolean;
}

interface CategoryProps {
  category: string;
}

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IGetProductListResponse, IProductGetBody>({
      query: (body: IProductGetBody) => ({
        url: "/product/get-list",
        method: "POST",
        body,
      }),
    }),
    getProductById: builder.query<IGetSingleProductResponse, string>({
      query: (id) => ({
        url: `/product/get-single/${id}`,
        method: "GET",
      }),
    }),
    getHomeItems: builder.query<IGetHomeItemProductListResponse, void>({
      query: (body) => ({
        url: "product/get-home-items",
        method: "GET",
        body,
      }),
    }),
    getSingleWithRelatedProduct: builder.query<
      IGetSingleAndRelatedProductListResponse,
      string
    >({
      query: (id) => ({
        url: `/product/get-single-detail/${id}`,
        method: "GET",
      }),
    }),
    getFeaturedCurrentSingleProduct: builder.query<
      IGetFeaturedProductResponse,
      void
    >({
      query: (body) => ({
        url: "/product/get-featured-single",
        method: "GET",
        body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetHomeItemsQuery,
  useGetSingleWithRelatedProductQuery,
  useGetFeaturedCurrentSingleProductQuery,
} = productApi;
