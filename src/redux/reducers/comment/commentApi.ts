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
    addComment: builder.mutation<ICreateCommentResponse, ICreateCommentRequest>(
      {
        query: ({ author, content, product }) => ({
          url: `/comment/${product}`,
          method: "POST",
          body: { author, content, product },
        }),
        invalidatesTags: ["comments"],
      }
    ),

    updateComment: builder.mutation<
      ICreateCommentResponse,
      { commentId: string; body: IUpdateCommentRequest }
    >({
      query: ({ commentId, body }) => ({
        url: `/comments/${commentId}`,
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
