import React, { useRef, useState } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Link from "next/link";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addToCart,
  isItemInCart,
  openCartDrawer,
} from "@/redux/reducers/cart/cartSlice";
import { IProduct } from "@/types/products";
import { paths } from "@/layouts/paths";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useBoolean from "@/hooks/use-boolean";
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow } from "@/utils/react-slick-utils";
import { CartItem } from "@/types/cart";
import { BooleanState } from "@/types/utils";

interface IProductCardProps {
  product: IProduct;
  quickOrderDialog: BooleanState;
}

const ProductCardNew = ({ product, quickOrderDialog }: IProductCardProps) => {
  const { name, images, price, _id, discount, status, category } = product;

  // const isOutOfStock = product.status === "OUT_OF_STOCK";

  const sliderRef = useRef<Slider | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const itemExists = useAppSelector(isItemInCart(product._id));

  const quickOrder = useBoolean();

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sliderRef.current?.slickPlay();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    sliderRef.current?.slickPause();
  };

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

  const authDialog = useBoolean();

  var sliderSettings = {
    dots: false,
    infinite: true,
    lop: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const handleQuickOrder = (item: IProduct) => {
    const carItem: CartItem = {
      category: item.category?.title ?? "",
      image: item.images[0],
      name: item.name,
      price: item.price,
      productId: item._id,
      quantity: 1,
      ...(item.about && { about: item.about }),
    };
    if (itemExists) {
      quickOrderDialog.setTrue();
    } else {
      dispatch(addToCart(carItem));
      quickOrderDialog.setTrue();
    }
  };

  return (
    <>
      <div className="relative flex z-10 flex-col w-full group shadow bg-white border p-1 group cursor-pointer overflow-hidden">
        <div>
          <div className="p-3 h-[271px] overflow-hidden lg:hidden">
            <div className="w-full flex items-center justify-center h-full">
              <Link href={`${paths.product.root}/${_id}`}>
                <img
                  alt={product.name}
                  className="h-[241px] object-contain"
                  src={images[0]}
                />
              </Link>
            </div>
          </div>
          <div
            className="p-3 h-[271px] overflow-hidden hidden lg:block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Slider {...sliderSettings} ref={sliderRef}>
              {images.map((img, index) => (
                <div className="w-full flex items-center justify-center h-full">
                  <Link href={`${paths.product.root}/${_id}`}>
                    <img
                      key={index}
                      alt={product.name}
                      className="h-[241px] object-contain"
                      src={img}
                    />
                  </Link>
                </div>
              ))}
            </Slider>

            <div className="absolute -right-11 top-1/3 z-10 flex-col md:flex gap-2 group-hover:right-3 transition-all duration-500 hidden">
              <button
                className="bg-gray-300 h-9 w-9 hover:bg-[#2e7d32] transition-all duration-200 rounded-full flex items-center justify-center hover:text-white bg-opacity-65 text-xs px-1.5 py-[2px]"
                onClick={previous}
              >
                <Icon icon="mdi:chevron-right" className="text-2xl" />
              </button>
            </div>

            <div className="absolute -left-11 top-1/3 z-10 flex-col md:flex gap-2 group-hover:left-3 transition-all duration-500 hidden">
              <button
                className="bg-gray-300 h-9 w-9 hover:bg-[#2e7d32] transition-all duration-200 rounded-full flex items-center justify-center hover:text-white bg-opacity-65 text-xs px-1.5 py-[2px]"
                onClick={next}
              >
                <Icon icon="mdi:chevron-left" className="text-2xl" />
              </button>
            </div>

            {status === "OUT_OF_STOCK" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <span className="text-white font-bold text-lg">
                  OUT OF STOCK
                </span>
              </div>
            )}
          </div>
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

        <div className="px-3 pb-3 bg-gray-200">
          <div className="flex items-center justify-between mt-2 w-full">
            <h3 className="text-[#2e7d32] text-2xl sm:text-xl font-bold text-center">
              ৳{price}
            </h3>
            <div className="bg-[#2e7d32] text-white text-xs px-3 py-0.5 font-semibold text-center">
              {category?.title ?? "N/A"}
            </div>
          </div>
          <Link href={`${paths.product.root}/${_id}`}>
            <h2
              className={`font-bold hover:text-[#2e7d32] transition-all duration-300 ease-in leading-5 line-clamp-2 overflow-ellipsis text-md mt-3 lg:mt-0 md:text-sm hover:underline h-10`}
            >
              {name}
            </h2>
          </Link>

          <div className="flex items-center gap-3 mt-3">
            <Tooltip title="ক্যাশ অন ডেলিভারিতে অর্ডার করুন" arrow>
              <Button
                style={{
                  borderRadius: 0,
                }}
                variant="contained"
                color="success"
                fullWidth
                onClick={() => handleQuickOrder(product)}
              >
                অর্ডার করুন
              </Button>
            </Tooltip>
            <div className="w-[47px]">
              <Tooltip title="কার্টে যোগ করুণ" arrow>
                <IconButton
                  // disabled={isOutOfStock}
                  sx={{
                    bgcolor: "white",
                    border: "1px solid #2e7d32",
                    "&:hover": {
                      bgcolor: "#2e7d32",
                      color: "white",
                    },
                  }}
                  onClick={() => handleAddToCart(product)}
                >
                  <AiOutlineShoppingCart />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      {/* <AuthModal dialog={authDialog} /> */}
      {/* <ProductQuickViewDialog
        dialog={quickView}
        product={product}
        onClick={han}
      /> */}
    </>
  );
};

export default ProductCardNew;
