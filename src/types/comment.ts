import { IUser } from "./auth";

export interface ICreateCommentRequest {
  content: string;
  product: string;
  author: string;
}

export interface IUpdateCommentRequest {
  content: string;
}

export interface ICreateCommentResponse {
  success: boolean;
  message: string;
  data: IComment;
}

export interface IGetPostWiseCommentResponse {
  success: boolean;
  message: string;
  data: IComment[];
}

export interface IComment {
  _id: string;
  product: string;
  content: string;
  author: IUser;
  createdAt: string;
  updatedAt: string;
}
