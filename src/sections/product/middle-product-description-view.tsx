import CartSidebar from "@/components/common/add-to-carted-product-notify-view";
import useBoolean from "@/hooks/use-boolean";
import ActionButton from "@/layouts/common/buttons/action-button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addToCart,
  isItemInCart,
  openCartDrawer,
} from "@/redux/reducers/cart/cartSlice";
import { IProduct } from "@/types/products";
import React, { useEffect, useState } from "react";
import { getProductStatus, getStatusStyles } from "./common/product-constants";
import toast from "react-hot-toast";
import { addLastVisitedProduct } from "@/redux/reducers/product/productSlice";
import { CartItem } from "@/types/cart";
import { Button, colors } from "@mui/material";
import { BooleanState } from "@/types/utils";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";

type TMiddleDescriptionProps = {
  product: IProduct;
  quickOrderDialog: BooleanState;
};

const MiddleProductDescription = ({
  product,
  quickOrderDialog,
}: TMiddleDescriptionProps) => {
  const { name, price, category, about, specifications, status, stock } =
    product;

  const isOutOfStock = stock === 0 || status === "OUT_OF_STOCK";

  console.log("status", status, stock);

  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const itemExists = useAppSelector(isItemInCart(product._id));

  // Handle quantity increase
  const handleIncrease = () => {
    if (quantity < stock) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.error("Cannot add more than available stock");
    }
  };

  // Handle quantity decrease
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async (item: IProduct) => {
    if (isOutOfStock) {
      toast.error("Product is out of stock");
      return;
    }
    const carItem: CartItem = {
      category: item.category?.title ?? "",
      image: item.images[0],
      name: item.name,
      price: item.price,
      productId: item._id,
      quantity,
      ...(item.about && { about: item.about }),
    };
    dispatch(addToCart(carItem));
    toast.success("Product added to cart successfully!!!");
    dispatch(openCartDrawer());
  };

  const lastVisitItem: CartItem = {
    category: product.category._id ?? "",
    image: product.images[0],
    name: product.name,
    price: product.price,
    productId: product._id,
    quantity: 1,
    about: product.about,
  };

  useEffect(() => {
    dispatch(addLastVisitedProduct(lastVisitItem));
  }, [dispatch, product]);

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
    <div className='className="w-full px-3 flex-1 mt-7 md:mt-0 lg:pl-7 xl:pl-9 2xl:pl-10"'>
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-black">{name}</h2>

        <div className="flex items-center gap-5 mt-5">
          <h3 className="text-3xl font-semibold text-primary">৳{price}</h3>
          <div
            className={`px-2 py-1 border text-white font-semibold text-sm ${getStatusStyles(
              status
            )}`}
          >
            {getProductStatus(status)}
          </div>
        </div>

        <div className="flex items-center mt-4 space-x-2">
          {isOutOfStock ? (
            <>
              <span className="text-red-600">
                {/* Out of Stock Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
              <p className="text-red-700 text-lg font-semibold">
                Currently Out of Stock
              </p>
            </>
          ) : (
            <>
              <span className="text-primary">
                {/* In Stock Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <p className="text-primary text-lg font-semibold">
                In Stock: <span className="font-semibold">{stock}</span>
              </p>
            </>
          )}
        </div>

        <div className="flex items-center bg-slate-100/70 px-2 py-2 mt-5 rounded-full w-min">
          <div className=" flex items-center justify-between space-x-5 w-full">
            <div className="flex items-center justify-between w-[104px] sm:w-28">
              <ActionButton
                icon="ph:minus"
                onClick={handleDecrease}
                disabled={quantity === 1}
              />
              <span className="select-none block flex-1 text-center leading-none">
                {quantity}
              </span>
              <ActionButton
                icon="ph:plus"
                onClick={handleIncrease}
                disabled={quantity >= stock || isOutOfStock}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-auto mt-5">
          <Button
            onClick={() => handleAddToCart(product)}
            variant="contained"
            color="secondary"
            startIcon={<MdOutlineShoppingCart />}
            disabled={isOutOfStock}
          >
            কার্টে যোগ করুণ
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={() => handleQuickOrder(product)}
            startIcon={<HiOutlineShoppingBag />}
            disabled={isOutOfStock}
          >
            এখনই অর্ডার করুন
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              const phoneNumber = "+8801870214081";
              const message = `Hello, I'm interested in the product id is = ${product._id} and product name is = ${product.name}!`;
              window.open(
                `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                  message
                )}`,
                "_blank"
              );
            }}
            startIcon={<FaWhatsapp />}
            sx={{
              textTransform: "capitalize",
              bgcolor: colors.grey[800],
              "&:hover": {
                bgcolor: colors.grey[900],
              },
            }}
          >
            Whatsapp Us
          </Button>
        </div>

        <div className="py-5 flex flex-col gap-1">
          <h2 className="text-xl font-semibold pb-2">Specifications</h2>
          {specifications.map((item, index) => (
            <h2 className="text-sm md:text-md">{item}</h2>
          ))}
        </div>
      </div>

      <p className="text-slate-600 text-md leading-6">{about}</p>
    </div>
  );
};

export default MiddleProductDescription;
