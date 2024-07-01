import { ICategoriesResponse } from "@/types/category";
import { api } from "../../api";
import { setCategories } from "./categorySlice";

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ICategoriesResponse, void>({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          if (response.data.success) {
            dispatch(setCategories(response.data.data));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetCategoriesQuery } = categoryApi;
