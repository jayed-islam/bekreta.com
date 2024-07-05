import { api } from "../../api";
import { ICreateOrder, IOrder } from "@/types/order";

interface IGetCreateOrderResponse {
  data: ICreateOrder;
  message: string;
  state: boolean;
}

interface IGetUserOrderResponse {
  data: IOrder[];
  message: string;
  state: boolean;
}

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<IGetCreateOrderResponse, ICreateOrder>({
      query: (body: ICreateOrder) => ({
        url: "/order",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),
    getUserOrderById: builder.query<IGetUserOrderResponse, string>({
      query: (userId) => ({
        url: `/order/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateOrderMutation, useGetUserOrderByIdQuery } = orderApi;
