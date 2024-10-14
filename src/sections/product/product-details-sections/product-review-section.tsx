import React, { useState } from "react";
import { Icon } from "@iconify-icon/react";
import { Rating, Typography, Box, IconButton, Collapse } from "@mui/material";
import { useGetCommentQuery } from "@/redux/reducers/comment/commentApi";
import useBoolean from "@/hooks/use-boolean";
import { IProduct } from "@/types/products";
import { useAppSelector } from "@/redux/hooks";
import AuthModal from "@/layouts/common/modal/auth-modal";
import ProductReviewDialog from "./product-review-dialog";
import ProductReviewItem from "./product-review-item";
import { IUser } from "@/types/auth";

interface ReviewTabProps {
  activeTab: string;
  product: IProduct;
}

const ReviewSection: React.FC<ReviewTabProps> = ({ activeTab, product }) => {
  const reviewModal = useBoolean();
  const { data, isFetching } = useGetCommentQuery({ productId: product._id });
  const { user } = useAppSelector((state) => state.auth);

  const dialog = useBoolean();
  const commentDialog = useBoolean();

  const handleClickOpen = () => {
    if (!user) {
      dialog.setTrue();
    } else {
      commentDialog.setTrue();
    }
  };

  return (
    <div id="reviews" className="bg-white px-5 pt-5 pb-7 shadow-sm mt-6">
      <div className="flex items-start sm:items-center gap-3 sm:gap-0 flex-col sm:flex-row justify-between pb-7">
        <div>
          <h3 className="font-semibold text-xl">
            Reviews ({data?.data.length || 0})
          </h3>
          <p className="text-md text-gray-500 pt-2">
            Get specific details about this product from customers who own it.
          </p>
        </div>
        <button
          onClick={handleClickOpen}
          className="border-2 border-green-700 rounded px-5 py-2 hover:bg-green-700 text-green-700 hover:text-white transition-all duration-200 ease-in text-md font-semibold cursor-pointer"
        >
          Write a Review
        </button>
      </div>

      <div className="border-t pt-5">
        {isFetching ? (
          <div>Loading...</div>
        ) : data?.data.length === 0 ? (
          <div>No reviews yet.</div>
        ) : (
          <div className="flex flex-col gap-5">
            {data?.data.map((comment) => (
              <ProductReviewItem comment={comment} user={user as IUser} />
            ))}
          </div>
        )}
      </div>
      <AuthModal dialog={dialog} />
      <ProductReviewDialog dialog={commentDialog} productId={product._id} />
    </div>
  );
};

export default ReviewSection;
