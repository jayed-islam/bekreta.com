import { ICategoriesResponse } from "@/types/category";
import { api } from "../../api";

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ICategoriesResponse, void>({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetCategoriesQuery } = categoryApi;
