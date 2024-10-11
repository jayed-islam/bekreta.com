import { api } from "../../api";
import { ICreateOrder, IOrder } from "@/types/order";

interface IGetCreateOrderResponse {
  data: ICreateOrder;
  message: string;
  success: boolean;
}

interface IGetUserOrderResponse {
  data: IOrder[];
  message: string;
  success: boolean;
}

interface IGetSingleOrderResponse {
  data: IOrder;
  message: string;
  success: boolean;
}

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<IGetCreateOrderResponse, ICreateOrder>({
      query: (body: ICreateOrder) => ({
        url: "/order",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders", "user-carts"],
    }),
    getUserOrderById: builder.query<IGetUserOrderResponse, string>({
      query: (userId) => ({
        url: `/order/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getSingleOrder: builder.query<IGetSingleOrderResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      providesTags: ["single-order"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateOrderMutation,
  useGetUserOrderByIdQuery,
  useGetSingleOrderQuery,
} = orderApi;
