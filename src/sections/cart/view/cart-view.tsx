"use client";

import PageHeader from "@/components/common/page-header";
import CartRow from "../cart-row-view";
import OrderSummery from "@/sections/cart/common/order-summary";
import { useAppSelector } from "@/redux/hooks";
import NoData from "@/layouts/common/no-data";
import Link from "next/link";
import { paths } from "@/layouts/paths";
import { Button } from "@mui/material";

const CartedProductListView = () => {
  const breadcrumbItems = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Cart", url: "/cart" },
  ];

  const { cartItems } = useAppSelector((state) => state.cart);

  return (
    <>
      <div className="bg-gray-100">
        <PageHeader pageName="Your Cart" breadcrumbItems={breadcrumbItems} />
        <div className="max-w-6xl mx-auto px-5 xl:px-0 pb-16">
          <hr className="border-slate-200  my-5 xl:my-7" />

          {cartItems.length === 0 ? (
            <div className="w-full bg-white p-16 rounded-lg flex flex-col items-center justify-center">
              <h3 className="text-lg mb-5">
                আপনার কার্ট খালি। প্রিয় পণ্য পেতে পণ্য যোগ করুন।
              </h3>
              <Link href={paths.product.category}>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  পণ্য দেখুন
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-[60%] xl:w-[55%]">
                {cartItems.map((item, index) => (
                  <CartRow key={index} item={item} />
                ))}
              </div>
              <div className="border-t lg:border-t-0 lg:border-l border-slate-200 my-10 lg:my-0 lg:mx-11 flex-shrink-0"></div>

              {/* summary */}
              <OrderSummery buttonTitle="Checkout" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartedProductListView;
