// CartItemRow.tsx
"use client";

import React from "react";
import {
  Box,
  IconButton,
  Typography,
  TextField,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import { Add, Remove, Close } from "@mui/icons-material";
import { CartItem } from "@/types/cart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "@/redux/reducers/cart/cartSlice";
import {
  deleteProduct,
  updateProductQuantity,
} from "@/redux/reducers/featured/featuredProductSlice";
import { IFeaturedProduct } from "@/types/featured-product";

interface CartItemRowProps {
  item: IFeaturedProduct;
}

const FeaturedCartItemSmall: React.FC<CartItemRowProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (productId: string, increase: boolean) => {
    const updatedQuantity = increase ? item.quantity + 1 : item.quantity - 1;
    if (updatedQuantity > 0) {
      dispatch(
        updateProductQuantity({ id: productId, quantity: updatedQuantity })
      );
    }
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(deleteProduct(productId));
  };
  return (
    <div className="w-full">
      <div className="flex items-start relative gap-3 w-full">
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          className="h-[4rem] w-[4rem] rounded-md"
          height={100}
          width={100}
        />
        <div className="flex-1">
          <h2 className="line-clamp-1 overflow-ellipsis text-sm pr-11">
            {item.product.name}
          </h2>
          <div className="flex items-center gap-5 mt-1">
            <div className="flex items-center border gap-2 bg-gray-100 rounded-full">
              <IconButton
                size="small"
                onClick={() => handleQuantityChange(item.product._id, false)}
                aria-label="decrease quantity"
              >
                <RemoveIcon className="text-sm" />
              </IconButton>
              <Typography variant="subtitle1">{item.quantity}</Typography>
              <IconButton
                size="small"
                onClick={() => handleQuantityChange(item.product._id, true)}
                aria-label="increase quantity"
              >
                <AddIcon className="text-sm" />
              </IconButton>
            </div>
            <h2 className="text-sm text-gray-500">
              মূল্য: {item.product.price.toFixed(2)}
            </h2>
          </div>
        </div>

        <div className="absolute right-0 top-0">
          <IconButton
            onClick={() => handleRemoveItem(item.product._id)}
            aria-label="remove item"
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <Divider
        sx={{
          my: 1,
        }}
      />
    </div>
  );
};

export default FeaturedCartItemSmall;
