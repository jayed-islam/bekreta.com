import useBoolean from "@/hooks/use-boolean";
import ActionButton from "@/layouts/common/buttons/action-button";
import DeleteConformationModal from "@/layouts/common/modal/delete-modal";
import { paths } from "@/layouts/paths";
import { useAppDispatch } from "@/redux/hooks";
import {
  useRemoveFromCartMutation,
  useUpdateCartItemQuantityMutation,
} from "@/redux/reducers/cart/cartApi";

import { CartItem, IUserCartItem } from "@/types/cart";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Link from "next/link";
import toast from "react-hot-toast";

interface Props {
  item: IUserCartItem;
}
const CartRow = ({ item }: Props) => {
  const dispatch = useAppDispatch();
  const dialog = useBoolean();

  const [updateQuantity, { isLoading }] = useUpdateCartItemQuantityMutation();

  const [removeFromCart, { isLoading: isRemoveItemLoading }] =
    useRemoveFromCartMutation();

  const handleUpdateQuantity = async (
    productId: string,
    action: "increase" | "decrease"
  ) => {
    try {
      const res = await updateQuantity({ productId, action }).unwrap();
      if (res.success) {
        console.log(res.message);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.data.message);
    }
  };

  const handleRemoveProduct = async (productId: string) => {
    try {
      const res = await removeFromCart(productId).unwrap();
      if (res.success) {
        console.log(res.message);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.data.message);
    }
  };

  return (
    <>
      <div className="relative flex py-3 px-3 rounded-xl my-3 bg-white first:mt-0 last:mb-0">
        <div className="relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={item.product.images[0]}
            className="h-full w-full object-cover"
          />
          <Link
            className="absolute inset-0"
            href={`${paths.product.root}/${item.product._id}`}
          ></Link>
        </div>
        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div className="flex-[1.5] ">
                <Link
                  href={`${paths.product.root}/${item.product._id}`}
                  className="text-base font-semibold"
                >
                  {item.product.name}
                </Link>
                <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 ">
                  <div className="flex items-center space-x-1.5">
                    <Icon
                      icon="ant-design:bg-colors-outlined"
                      className="text-xl"
                    />
                    <span>Black</span>
                  </div>
                  <span className="mx-4 border-l border-slate-200  "></span>
                  <div className="flex items-center space-x-1.5">
                    <Icon
                      icon="fluent-mdl2:product-variant"
                      className="text-xl"
                    />
                    <span>Gmieai</span>
                  </div>
                </div>
                <div className="mt-3 flex justify-between w-full sm:hidden relative">
                  <div className="flex items-center justify-between space-x-5 relative z-10">
                    <div className="flex items-center justify-between w-[104px] sm:w-28">
                      <ActionButton
                        icon="ph:minus"
                        onClick={() =>
                          handleUpdateQuantity(item.product._id, "decrease")
                        }
                      />
                      <span className="select-none block flex-1 text-center leading-none">
                        {item.quantity}
                      </span>

                      <ActionButton
                        icon="ph:plus"
                        onClick={() =>
                          handleUpdateQuantity(item.product._id, "increase")
                        }
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full">
                      <span className="text-green-500 !leading-none">$500</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block text-center relative">
                <div className="flex items-center justify-between space-x-5 relative z-10">
                  <div className="flex items-center justify-between w-[104px] sm:w-28">
                    <ActionButton
                      icon="ph:minus"
                      onClick={() =>
                        handleUpdateQuantity(item.product._id, "decrease")
                      }
                    />
                    <span className="select-none block flex-1 text-center leading-none">
                      {item.quantity}
                    </span>
                    <ActionButton
                      icon="ph:plus"
                      onClick={() =>
                        handleUpdateQuantity(item.product._id, "increase")
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="hidden flex-1 sm:flex justify-end">
                <div className="mt-0.5">
                  <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                    <span className="text-green-500 !leading-none">
                      ৳ {item.product.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700  border border-slate-200 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="w-3.5 h-3.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                ></path>
              </svg>
              <span className="ml-1 leading-none">In Stock</span>
            </div>
            <button
              onClick={dialog.setTrue}
              className="relative z-10 flex items-center mt-3 font-bold text-green-600 hover:text-primary-500 text-sm "
            >
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
      <DeleteConformationModal dialog={dialog} productId={item.product._id} />
    </>
  );
};

export default CartRow;
