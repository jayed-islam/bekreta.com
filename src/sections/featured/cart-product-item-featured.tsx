import useBoolean from "@/hooks/use-boolean";
import { useAppDispatch } from "@/redux/hooks";
import {
  deleteProduct,
  updateProductQuantity,
} from "@/redux/reducers/featured/featuredProductSlice";
import { IFeaturedProduct } from "@/types/featured-product";
import { Icon, IconButton } from "@mui/material";
import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiMinus, FiPlus } from "react-icons/fi";

interface Props {
  featuredItem: IFeaturedProduct;
  isCurrentFeatured: boolean;
}

const FeaturedProductCheckoutItem = ({
  featuredItem,
  isCurrentFeatured,
}: Props) => {
  const dialog = useBoolean();

  //   console.log("prod", product.quantity);

  const dispatch = useAppDispatch();

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateProductQuantity({ id, quantity }));
    console.log("aaa");
  };

  const handleRemove = () => {
    dispatch(deleteProduct(featuredItem.product._id));
    dialog.setFalse();
  };

  return (
    <>
      <div className=" flex py-3 px-3 rounded-xl my-3 bg-white first:mt-0 last:mb-0 relative">
        <div className="relative h-16 w-16 border flex-shrink-0 overflow-hidden rounded-xl bg-white shadow-sm">
          <Image
            src={featuredItem.product.images[0]}
            className="h-full w-full"
            alt="ring"
            height={500}
            width={500}
          />
        </div>
        {!isCurrentFeatured && (
          <div
            className="absolute right-2 top-2 cursor-pointer"
            onClick={handleRemove}
          >
            <RiDeleteBinLine />
          </div>
        )}
        <div className="ml-3 flex flex-1 flex-col">
          <div className="flex justify-between ">
            <div className="flex-1">
              <h2
                className={` font-semibold line-clamp-1 overflow-ellipsis text-sm ${
                  !isCurrentFeatured && "pr-3"
                }`}
              >
                {featuredItem.product.name}
              </h2>

              <div className="mt-4 flex justify-between w-full relative items-center">
                <div className="flex items-center border border-green-500 rounded-md py-1 px-2  md:px-2.5 text-xs font-medium h-full">
                  <span className="text-green-500 !leading-none font-semibold">
                    ৳ {featuredItem.product.price}
                  </span>
                </div>
                <div className="flex items-center justify-between w-20">
                  <IconButton
                    sx={{
                      border: "1px solid gray",
                      p: 0.2,
                    }}
                    size="small"
                    onClick={() =>
                      handleUpdateQuantity(
                        featuredItem.product._id,
                        featuredItem.quantity - 1
                      )
                    }
                    disabled={featuredItem.quantity <= 1}
                  >
                    <FiMinus />
                  </IconButton>
                  <span className="select-none block flex-1 text-center leading-none">
                    {featuredItem.quantity}
                  </span>
                  <IconButton
                    sx={{
                      border: "1px solid gray",
                      p: 0.2,
                    }}
                    size="small"
                    onClick={() =>
                      handleUpdateQuantity(
                        featuredItem.product._id,
                        featuredItem.quantity + 1
                      )
                    }
                  >
                    <FiPlus />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedProductCheckoutItem;
