import { IProduct } from "./products";

export interface IFeaturedProduct {
  product: IProduct;
  quantity: number;
}

export interface ICheckoutFormData {
  name: string;
  phone: string;
  division: string;
  district: string;
  subDistrict: string;
  detailAddress: string;
}
