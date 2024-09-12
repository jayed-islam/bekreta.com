import { BooleanState } from "@/types/utils";
import { Dialog, Typography } from "@mui/material";
import React from "react";
import { IProduct } from "@/types/products";
import { IoMdClose } from "react-icons/io";
import ImageViewFeatured from "@/sections/featured/image-view-featured";

interface Props {
  dialog: BooleanState;
  product: IProduct;
  onClick: () => void;
}

const ProductQuickViewDialog = ({ dialog, product, onClick }: Props) => {
  return (
    <Dialog
      open={dialog.value}
      onClose={dialog.setFalse}
      maxWidth="md"
      className="z-10"
    >
      <div className="flex-1 flex gap-5 items-start md:flex-row flex-col p-3 md:p-5 relative">
        <ImageViewFeatured
          images={product.images || []}
          name={product.name || ""}
          isDetailsViewDialog={true}
        />
        <div
          onClick={dialog.setFalse}
          className="bg-gray-300 h-9 w-9 hover:bg-green-500 transition-all duration-200 rounded-full flex items-center justify-center hover:text-white md:hidden cursor-pointer absolute right-3 top-3 border border-green-500"
        >
          <IoMdClose className="text-xl" />
        </div>
        <div className="w-full md:w-[65%] md:pr-5">
          <Typography variant="h5" className="pb-1.5 font-semibold">
            {product.name}
          </Typography>
          <div className="py-5">
            <Typography className="text-md font-semibold mb-2">
              Specification
            </Typography>
            {product.specifications.map((item, index) => (
              <h2 className="text-sm md:text-md">{item}</h2>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <h2 className="text-xl">Price:</h2>
            <h2 className="text-xl md:text-2xl font-bold text-green-500">
              ৳{product.price}
            </h2>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <h2 className="text-lg">Stock:</h2>
            <h2 className="text-lg md:text-xl font-bold">
              {product.stock} <span className="font-normal">items only</span>
            </h2>
          </div>

          <button
            disabled={product.status === "OUT_OF_STOCK"}
            onClick={onClick}
            className={`${
              product.status === "OUT_OF_STOCK"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } transition-all duration-200 text-center w-full font-semibold text-white mt-2 sm:py-1 py-2`}
          >
            Quick Add
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductQuickViewDialog;
