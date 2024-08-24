export interface IProductItem {
  _id: string;
  desc: string;
  images: string[];
  name: string;
  price: number;
  review: string;
  category: string;
  brand: string;
  status: string;
}

export interface IProduct {
  priority: number;
  _id: string;
  name: string;
  about: string;
  descriptions: string[];
  price: number;
  category: string;
  stock: number;
  images: string[];
  specifications: string[];
  keywords: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  discount: {
    isDiscount: boolean;
    percentage: number;
  };
  isFeatured: boolean;
  status: "IN_STOCK" | "OUT_OF_STOCK" | "DISCOUNTED" | "FEATURED";
}

export interface IPagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface IGetProductListResponse {
  data: {
    pagination: IPagination;
    products: IProduct[];
  };
}

export interface IGetHomeItemProductListResponse {
  statusCode: number;
  message: string;
  state: boolean;
  data: {
    offerItems: IProduct[];
    newItems: IProduct[];
  };
}

export interface IGetCategoryWiseProductListResponse {
  statusCode: number;
  message: string;
  state: boolean;
  data: IProduct[];
}

export interface IGetSingleAndRelatedProductListResponse {
  statusCode: number;
  message: string;
  state: boolean;
  data: {
    product: IProduct;
    relatedProducts: IProduct[];
  };
}

export type ProductStatus =
  | "IN_STOCK"
  | "OUT_OF_STOCK"
  | "DISCOUNTED"
  | "FEATURED"
  | "ALL";

export interface IProductGetBody {
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
  category?: string;
  page?: number;
  limit?: number;
  status?: ProductStatus[];
  isLowestFirst?: boolean | null;
}

export interface IProductFilters {
  minPrice: number;
  maxPrice: number;
  category: string;
  status: ProductStatus[];
  searchTerm: string;
  isLowestFirst?: boolean | null;
}

export interface IFeaturedProductGetBody {
  page?: number;
  limit?: number;
}

export interface IOfferedProductGetBody {
  page?: number;
  limit?: number;
}
