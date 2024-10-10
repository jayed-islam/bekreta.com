import useBoolean from "@/hooks/use-boolean";
import DeleteConformationModal from "@/layouts/common/modal/cart-item-delete-dialog";
import { paths } from "@/layouts/paths";
import { useAppDispatch } from "@/redux/hooks";
import { updateCartItemQuantity } from "@/redux/reducers/cart/cartSlice";

import { CartItem } from "@/types/cart";
import { Button, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface Props {
  item: CartItem;
}
const CartRow = ({ item }: Props) => {
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
    <>
      <div className="flex py-3 px-3 rounded-xl my-3 bg-white first:mt-0 last:mb-0 gap-3">
        <div className="relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 p-2">
          <Image
            alt={item.name}
            height={100}
            width={100}
            src={item.image}
            className="h-full w-full object-cover"
          />
          <Link
            className="absolute inset-0"
            href={`${paths.product.root}/${item.productId}`}
          ></Link>
        </div>
        <div className="flex-1 relative">
          <Link
            href={`${paths.product.root}/${item.productId}`}
            className="text-sm sm:text-base line-clamp-2 overflow-ellipsis font-semibold"
          >
            {item.name}
          </Link>

          <div className="absolute right-2 top-1 hidden md:flex items-center border-2 border-[#2e7d32]  rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm ">
            <span className="text-[#2e7d32] leading-none font-bold">
              ৳ {item.price}
            </span>
          </div>
          <div className="absolute bottom-1 right-2">
            <Button
              color="success"
              sx={{
                textTransform: "capitalize",
                fontWeight: 700,
              }}
              onClick={dialog.setTrue}
            >
              Remove
            </Button>
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-5">
              <div className="flex items-center border rounded-md px-2 gap-2 bg-gray-100">
                <IconButton
                  size="small"
                  onClick={() => handleQuantityChange(item.productId, false)}
                  aria-label="decrease quantity"
                >
                  <RemoveIcon className="text-sm" />
                </IconButton>
                <Typography variant="subtitle1">{item.quantity}</Typography>
                <IconButton
                  size="small"
                  onClick={() => handleQuantityChange(item.productId, true)}
                  aria-label="increase quantity"
                >
                  <AddIcon className="text-sm" />
                </IconButton>
              </div>
              <h2 className="text-sm text-gray-500 md:flex hidden">
                মূল্য: {item.price.toFixed(2)}
              </h2>
              <div className="md:hidden items-center border-2 border-[#2e7d32]  rounded-lg py-1 px-2 text-sm whitespace-nowrap">
                <span className="text-[#2e7d32] leading-none font-bold">
                  ৳ {item.price}
                </span>
              </div>
            </div>
            <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 w-min whitespace-nowrap border border-slate-200 mt-5">
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
              <span className="ml-1 leading-none whitespace-nowrap">
                In Stock
              </span>
            </div>
          </div>
        </div>
      </div>
      <DeleteConformationModal dialog={dialog} productId={item.productId} />
    </>
  );
};

export default CartRow;
