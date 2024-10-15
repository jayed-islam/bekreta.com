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
  userId?: string;
  products: IOrderCreateItem[];
  phone: string;
  name: string;
  address: string;
  orderNote?: string;
  status?: OrderStatus;
  paymentMethod?: string;
  paymentStatus?: string;
  subTotal: number;
  totalPrice: number;
  isCanceled?: boolean;
  createdAt?: Date;
  deliveryArea: string;
  deliveryCharge: number;
}

export interface IOrder {
  _id?: string;
  userId: string;
  products: IOrderItem[];
  phone: string;
  name: string;
  address: string;
  subTotal: number;
  deliveryArea: string;
  deliveryCharge: number;
  status?: OrderStatus;
  paymentMethod?: string;
  paymentStatus?: string;
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
