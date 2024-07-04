export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  about?: string;
}

interface ICartItem {
  product: string;
  quantity: number;
}

export interface ICartResponse {
  success: boolean;
  message: string;
  data: {
    userId: string;
    products: ICartItem[];
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

interface IProduct {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  status: "IN_STOCK" | "OUT_OF_STOCK" | "DISCOUNTED" | "FEATURED";
}

export interface IUserCartItem {
  product: IProduct;
  quantity: number;
}

export interface IUserCartResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    userId: string;
    products: IUserCartItem[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}
