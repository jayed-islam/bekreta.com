/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ICreateCommentRequest,
  ICreateCommentResponse,
  IGetPostWiseCommentResponse,
  IUpdateCommentRequest,
} from "@/types/comment";
import { api } from "../../api";

export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getComment: builder.query<
      IGetPostWiseCommentResponse,
      { productId: string }
    >({
      query: ({ productId }) => ({
        url: `/comment/${productId}`,
      }),
      providesTags: ["comments"],
    }),
    addComment: builder.mutation<ICreateCommentResponse, FormData>({
      query: (body) => ({
        url: `/comment`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["comments"],
    }),

    updateComment: builder.mutation<
      ICreateCommentResponse,
      { commentId: string; body: FormData }
    >({
      query: ({ commentId, body }) => ({
        url: `/comment/update/${commentId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["comments"],
    }),

    deleteComment: builder.mutation<
      ICreateCommentResponse,
      { commentId: string }
    >({
      query: ({ commentId }) => ({
        url: `/comment/delete/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["comments"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentQuery,
} = commentApi;
