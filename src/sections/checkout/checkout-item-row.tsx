import QuantityLoader from "@/components/loader/quantity-loder";
import useBoolean from "@/hooks/use-boolean";
import ActionButton from "@/layouts/common/buttons/action-button";
import DeleteConformationModal from "@/layouts/common/modal/cart-item-delete-dialog";
import { useUpdateCartItemQuantityMutation } from "@/redux/reducers/cart/cartApi";
import { CartItem } from "@/types/cart";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { paths } from "@/layouts/paths";
import { useAppDispatch } from "@/redux/hooks";
import { updateCartItemQuantity } from "@/redux/reducers/cart/cartSlice";

interface Props {
  item: CartItem;
}

const CheckoutProductRow = ({ item }: Props) => {
  const dialog = useBoolean();

  // const [updateQuantity, { isLoading }] = useUpdateCartItemQuantityMutation();

  // const handleUpdateQuantity = async (
  //   productId: string,
  //   action: "increase" | "decrease"
  // ) => {
  //   try {
  //     const res = await updateQuantity({ productId, action }).unwrap();
  //     if (res.success) {
  //       console.log(res.message);
  //       toast.success(res.message);
  //     } else {
  //       toast.error(res.message);
  //     }
  //   } catch (err: any) {
  //     console.log(err);
  //     toast.error(err.data.message);
  //   }
  // };

  const dispatch = useAppDispatch();

  const handleQuantityChange = (productId: string, increment: boolean) => {
    dispatch(updateCartItemQuantity({ productId, increment }));
  };
  return (
    <div className="relative flex bg-white p-3 border rounded-xl gap-3 shadow-sm">
      <div className="relative h-24 w-20  flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 border">
        <img src={item.image} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div className="">
            <h3 className="text-sm font-semibold line-clamp-1 overflow-ellipsis">
              <Link href={`${paths.product.root}/${item.productId}`}>
                {item.name}
              </Link>
            </h3>
            <div className="text-sm flex items-center text-slate-600 mt-2">
              <div className="flex items-center space-x-1.5">
                <Icon icon="tdesign:fill-color-1" />
                <span>{item.category}</span>
              </div>
              <span className="mx-1 border-l border-slate-200  "></span>
              <div className="flex items-center space-x-1.5">
                <Icon icon="tabler:brand-kbin" />
                {/* <span>{getProductStatus(item.status)}</span> */}
              </div>
            </div>
          </div>
          <div className="hidden flex-1 sm:flex justify-end">
            <div className="mt-0.5">
              <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                <span className="text-green-500 !leading-none">$50</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between w-full">
          <div className="flex items-center justify-between w-[104px] sm:w-28">
            <ActionButton
              icon="ph:minus"
              onClick={() => handleQuantityChange(item.productId, false)}
            />
            <span className="select-none  text-center leading-none">
              {item.quantity}
            </span>

            <ActionButton
              icon="ph:plus"
              onClick={() => handleQuantityChange(item.productId, false)}
            />
          </div>
          <button
            onClick={dialog.setTrue}
            type="button"
            className="relative z-10 flex items-center font-semibold text-green-600 hover:text-primary-500 text-sm "
          >
            <span>Remove</span>
          </button>
        </div>
      </div>
      <DeleteConformationModal dialog={dialog} productId={item.productId} />
    </div>
  );
};

export default CheckoutProductRow;
