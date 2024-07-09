import { IProduct } from "./products";

export interface IOrderCreateItem {
  product: string;
  quantity: number;
  price: number;
}

export enum OrderStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled",
}

export interface IOrderItem {
  product: IProduct;
  quantity: number;
  price: number;
}

export interface ICreateOrder {
  _id?: string;
  userId: string;
  products: IOrderCreateItem[];
  phone: string;
  userName: string;
  status?: OrderStatus;
  paymentMethod?: string;
  paymentStatus?: string;
  shippingAddress: {
    detailAddress: string;
    district: string;
    division: string;
    subDistrict: string;
  };
  totalPrice: number;
  isCanceled?: boolean;
  createdAt?: Date;
}

export interface IOrder {
  _id?: string;
  userId: string;
  products: IOrderItem[];
  phone: string;
  userName: string;
  status?: OrderStatus;
  paymentMethod?: string;
  paymentStatus?: string;
  shippingAddress: {
    detailAddress: string;
    district: string;
    division: string;
    subDistrict: string;
  };
  totalPrice: number;
  isCanceled?: boolean;
  createdAt?: Date;
}

export interface ICreateOfferedOrder {
  _id?: string;
  products: IOrderCreateItem[];
  phone: string;
  fullName: string;
  status?: OrderStatus;
  shippingAddress: {
    detailAddress: string;
    district: string;
    division: string;
    subDistrict: string;
  };
  totalPrice: number;
  isCanceled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
