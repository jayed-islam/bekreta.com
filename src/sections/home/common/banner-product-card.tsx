import React from "react";
import Link from "next/link";
import { IProduct } from "@/types/products";
import { paths } from "@/layouts/paths";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface IProductCardProps {
  product: IProduct;
}

const BannerProductCard = ({ product }: IProductCardProps) => {
  const { name, images, price, _id } = product;
  const isOutOfStock = product.status === "OUT_OF_STOCK";

  const endTime = "2024-06-25T19:59:59";

  const router = useRouter();

  return (
    <div className="relative flex z-10 flex-col w-full group cursor-pointer overflow-hidden px-2">
      <div className="p-3 h-[271px] overflow-hidden">
        <div className="w-full flex items-center justify-center h-full">
          <img
            alt={product.name}
            className="h-[241px] object-contain"
            src={images[0]}
          />
        </div>

        {product.status === "OUT_OF_STOCK" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white font-bold text-lg">OUT OF STOCK</span>
          </div>
        )}
      </div>

      <div className="px-3 pb-3 bg-gray-200">
        <div className="flex items-center justify-between mt-2 w-full">
          <h3 className="text-[#2e7d32] text-lg sm:text-xl font-bold text-center">
            ৳{price}
          </h3>
        </div>
        <Link href={`${paths.product.root}/${_id}`}>
          <h2
            className={`font-bold group-hover:text-[#2e7d32] transition-all duration-300 ease-in leading-5 line-clamp-1 overflow-ellipsis text-sm md:text-sm hover:underline`}
          >
            {name}
          </h2>
        </Link>
        <Button
          sx={{
            borderRadius: 0,
            mt: 1.5,
          }}
          variant="contained"
          color="success"
          fullWidth
          onClick={() => router.push(`${paths.product.root}/${product._id}`)}
        >
          বিস্তারিত দেখুন
        </Button>
      </div>
    </div>
  );
};

export default BannerProductCard;
