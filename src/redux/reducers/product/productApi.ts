import {
  IFeaturedProductGetBody,
  IGetCategoryWiseProductListResponse,
  IGetProductListResponse,
  IOfferedProductGetBody,
  IProduct,
  IProductGetBody,
} from "@/types/products";
import { api } from "../../api";

interface IGetSingleProductRecponse {
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
    getProductById: builder.query<IGetSingleProductRecponse, string>({
      query: (id) => ({
        url: `/product/get-single/${id}`,
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
    getOfferetProducts: builder.query<
      IGetProductListResponse,
      IOfferedProductGetBody
    >({
      query: (body) => ({
        url: "product/offered",
        method: "POST",
        body,
      }),
    }),
    getCategoryWiseProduct: builder.query<
      IGetCategoryWiseProductListResponse,
      CategoryProps
    >({
      query: ({ category }) => ({
        url: `/product/category/${category}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetFeaturedProductsQuery,
  useGetOfferetProductsQuery,
  useGetCategoryWiseProductQuery,
} = productApi;
