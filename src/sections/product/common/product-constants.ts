import { ProductStatus } from "@/types/products";

export const getProductStatus = (status: ProductStatus) => {
  switch (status) {
    case "IN_STOCK":
      return "In Stock";
    case "OUT_OF_STOCK":
      return "Out Of Stock";
    case "DISCOUNTED":
      return "Discounted";
    case "FEATURED":
      return "Featured";
    default:
      return "In Stock";
  }
};

export const getStatusStyles = (status: ProductStatus) => {
  switch (status) {
    case "IN_STOCK":
      return "bg-green-500 text-green-800 border-green-500";
    case "OUT_OF_STOCK":
      return "bg-red-500 text-red-800 border-red-500";
    case "DISCOUNTED":
      return "bg-yellow-500 text-yellow-800 border-yellow-500";
    case "FEATURED":
      return "bg-blue-500 text-blue-800 border-blue-500";
    default:
      return "bg-gray-100 text-gray-800 border-gray-500";
  }
};
