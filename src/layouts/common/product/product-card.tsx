import React from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Link from "next/link";
import { Button } from "@mui/material";
import { IProduct } from "@/types/products";
import { paths } from "@/layouts/paths";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types/cart";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart, openCartDrawer } from "@/redux/reducers/cart/cartSlice";
import toast from "react-hot-toast";

interface IProductCardProps {
  product: IProduct;
  className?: string;
  size: "sm" | "lg";
}

const ProductCard = ({
  product,
  className,
  size = "lg",
}: IProductCardProps) => {
  const { name, images, price, _id, discount, status } = product;

  const router = useRouter();
  const isOutOfStock = product.status === "OUT_OF_STOCK";
  const dispatch = useAppDispatch();

  const handleAddToCart = async (item: IProduct) => {
    const carItem: CartItem = {
      category: item.category?.title ?? "",
      image: item.images[0],
      name: item.name,
      price: item.price,
      productId: item._id,
      quantity: 1,
      ...(item.about && { about: item.about }),
    };
    dispatch(addToCart(carItem));
    toast.success("Product added to cart successfully!!!");
    dispatch(openCartDrawer());
  };

  return (
    <>
      <div
        className={twMerge(
          "relative flex z-10 flex-col w-full group shadow bg-white border p-1 group cursor-pointer overflow-hidden",
          className
        )}
      >
        <div
          className={`relative w-full h-36 border-b overflow-hidden flex items-center justify-center ${
            size === "sm" ? "h-36 md:h-44" : "h-36 md:h-64"
          }`}
        >
          <Link href={`${paths.product.root}/${_id}`}>
            <img
              alt={product.name}
              className={`group-hover:scale-105 transition-all duration-500  ${
                size === "sm" ? "h-28 md:h-38" : "h-28 md:h-56"
              }`}
              src={images[0]}
            />
          </Link>

          {status === "OUT_OF_STOCK" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-bold text-lg">OUT OF STOCK</span>
            </div>
          )}
        </div>
        {discount.isDiscount && (
          <div className="hidden rounded-full md:flex items-center justify-center absolute top-2 left-2 px-2.5 py-1.5 text-xs bg-green-500 text-white">
            <Icon
              icon="iconamoon:discount-light"
              className="h-3 w-3 text-white"
            />
            <span className="ml-1 leading-none">
              {discount.percentage}% Discount
            </span>
          </div>
        )}

        <div className="p-2 bg-gray-200">
          <Link href={`${paths.product.root}/${_id}`}>
            <h2 className="text-xs line-clamp-2 overflow-ellipsis">{name}</h2>
          </Link>

          <div className="flex items-center flex-col-reverse md:flex-row justify-between w-full pt-2">
            <Button
              onClick={() => handleAddToCart(product)}
              variant="contained"
              size="small"
              color="success"
              fullWidth
              sx={{
                borderRadius: 0,
              }}
            >
              কার্টে যোগ করুণ
            </Button>
            <h3 className="text-green-700 text-lg font-bold">৳{price}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
