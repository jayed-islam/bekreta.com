import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Link from "next/link";
import { Button, Tooltip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openCartDrawer } from "@/redux/reducers/cart/cartSlice";
import { IProduct } from "@/types/products";
import { paths } from "@/layouts/paths";
import { useAddToCartMutation } from "@/redux/reducers/cart/cartApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoEyeOutline } from "react-icons/io5";
import useBoolean from "@/hooks/use-boolean";
import ProductQuickViewDialog from "./product-quick-view-dialog";
import AuthModal from "../modal/auth-modal";
import Slider from "react-slick";
import {
  offerProductSettings,
  SampleNextArrow,
  SamplePrevArrow,
} from "@/utils/react-slick-utils";

interface IProductCardProps {
  product: IProduct;
}

const ProductCardNew = ({ product }: IProductCardProps) => {
  const { name, images, price, _id, discount, status } = product;

  const { accessToken, user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const isOutOfStock = product.status === "OUT_OF_STOCK";

  const sliderRef = useRef<Slider | null>(null);
  const bannerRef = useRef<Slider | null>(null);
  const [isHovered, setIsHovered] = useState(false);

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

  const [addToCart, { isLoading }] = useAddToCartMutation();

  const handleAddToCart = async () => {
    try {
      const res = await addToCart({
        item: {
          product: product._id,
          quantity: 1,
        },
      }).unwrap();

      if (res.success) {
        toast.success(res.message);
        dispatch(openCartDrawer());
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCartMain = () => {
    if (!user || !accessToken) {
      router.push(`${paths.product.root}/${_id}`);
    } else {
      handleAddToCart();
    }
  };

  const quickView = useBoolean();

  const authDialog = useBoolean();

  const han = () => {
    if (!user || !accessToken) {
      authDialog.setTrue();
      console.log("test");
    } else {
      handleAddToCart();
    }
  };

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

  return (
    <>
      <div className="relative flex z-10 flex-col w-full group shadow bg-white border p-1 group cursor-pointer overflow-hidden">
        <div
          className="p-3 h-[271px] overflow-hidden "
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Slider {...sliderSettings} ref={sliderRef}>
            {images.map((img, index) => (
              <div className="w-full flex items-center justify-center h-full">
                <img
                  key={index}
                  alt={product.name}
                  className="h-[241px] object-contain"
                  src={img}
                />
              </div>
            ))}
          </Slider>

          <div className="absolute -right-11 top-1/3 z-10 flex-col md:flex gap-2 group-hover:right-3 transition-all duration-500 hidden">
            <button
              className="bg-gray-300 h-9 w-9 hover:bg-green-500 transition-all duration-200 rounded-full flex items-center justify-center hover:text-white bg-opacity-65 text-xs px-1.5 py-[2px]"
              onClick={previous}
            >
              <Icon icon="mdi:chevron-right" className="text-2xl" />
            </button>
          </div>

          <div className="absolute -left-11 top-1/3 z-10 flex-col md:flex gap-2 group-hover:left-3 transition-all duration-500 hidden">
            <button
              className="bg-gray-300 h-9 w-9 hover:bg-green-500 transition-all duration-200 rounded-full flex items-center justify-center hover:text-white bg-opacity-65 text-xs px-1.5 py-[2px]"
              onClick={next}
            >
              <Icon icon="mdi:chevron-left" className="text-2xl" />
            </button>
          </div>

          {/* <div className="absolute bottom-32 -right-32 z-10 flex-col md:flex gap-2 group-hover:right-3 transition-all duration-500 hidden">
            <Button
              onClick={quickView.setTrue}
              color="success"
              size="small"
              variant="outlined"
              style={{
                textTransform: "capitalize",
                paddingTop: 0,
                paddingBottom: 0,
              }}
            >
              Quick View
            </Button>
          </div> */}

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

        <div className="px-3 pb-3 bg-gray-200">
          <div className="flex items-center justify-between mt-2 w-full">
            <h3 className="text-[#2e7d32] text-lg sm:text-xl font-bold text-center">
              ৳{price}
            </h3>
          </div>
          <Link href={`${paths.product.root}/${_id}`}>
            <h2
              className={`font-bold hover:text-[#2e7d32] transition-all duration-300 ease-in leading-5 line-clamp-1 overflow-ellipsis text-sm md:text-sm`}
            >
              {name}
            </h2>
          </Link>

          <div className="flex items-center gap-3 mt-3">
            <Button
              style={{
                borderRadius: 0,
              }}
              variant="contained"
              color="success"
              fullWidth
            >
              অর্ডার করুন
            </Button>
            <div className="w-[47px]">
              <Tooltip title="কার্টে যোগ করুণ">
                <button
                  disabled={isOutOfStock}
                  className={`h-9 w-9 transition-all duration-200 rounded-full flex items-center justify-center ${
                    isOutOfStock
                      ? "bg-gray-300 text-gray-500"
                      : "bg-white hover:bg-green-600 hover:text-white"
                  }`}
                  onClick={handleAddToCartMain}
                >
                  <Icon icon="solar:bag-4-linear" className="text-xl" />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <AuthModal dialog={authDialog} />
      <ProductQuickViewDialog
        dialog={quickView}
        product={product}
        onClick={han}
      />
    </>
  );
};

export default ProductCardNew;
