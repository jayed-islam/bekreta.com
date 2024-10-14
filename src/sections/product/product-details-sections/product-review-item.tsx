import React, { useState } from "react";
import { Icon } from "@iconify-icon/react";
import { Rating, Typography, Box, IconButton, Collapse } from "@mui/material";
import { useGetCommentQuery } from "@/redux/reducers/comment/commentApi";
import useBoolean from "@/hooks/use-boolean";
import { IProduct } from "@/types/products";
import { useAppSelector } from "@/redux/hooks";
import AuthModal from "@/layouts/common/modal/auth-modal";
import ProductReviewDialog from "./product-review-dialog";
import { IComment } from "@/types/comment";
import { IUser } from "@/types/auth";

interface Props {
  comment: IComment;
  user: IUser;
}

const ProductReviewItem = ({ comment, user }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage((prev) => (prev === imageUrl ? null : imageUrl));
  };

  return (
    <div key={comment._id} className="border-b pb-4">
      {/* Rating and Review Header */}
      <div className="flex justify-between items-center">
        <Rating value={comment.rating} readOnly precision={0.5} size="small" />
        <Typography variant="caption" className="text-gray-400">
          {new Date(comment.createdAt).toLocaleDateString()}
        </Typography>
      </div>

      {/* User and Review Details */}
      <div className="flex justify-between items-center mt-1">
        <Typography variant="body2" className="font-semibold">
          {comment.author.name || "N/A"}
        </Typography>
        {user?._id === comment.author._id && (
          <div className="flex space-x-2">
            <IconButton size="small">
              <Icon icon="mdi:pencil" />
            </IconButton>
            <IconButton size="small">
              <Icon icon="mdi:delete" />
            </IconButton>
          </div>
        )}
      </div>

      {/* Review Content */}
      <Typography variant="body2" className="mt-2 text-gray-600">
        {comment.content}
      </Typography>

      {/* Image Gallery */}
      {comment.imageUrls && comment.imageUrls.length > 0 && (
        <div className="mt-3 flex gap-2">
          {comment.imageUrls.map((imageUrl: string, index: number) => (
            <img
              key={index}
              src={imageUrl}
              alt="Review Image"
              className={`w-20 h-20 object-cover cursor-pointer border ${
                selectedImage === imageUrl
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
              onClick={() => handleImageClick(imageUrl)}
            />
          ))}
        </div>
      )}

      {/* Collapsible Full Image View */}
      <Collapse in={!!selectedImage}>
        {selectedImage && (
          <div className="mt-4">
            <img
              src={selectedImage}
              alt="Selected Review"
              className="w-full md:w-1/2 h-72 object-cover rounded-md"
            />
          </div>
        )}
      </Collapse>

      {/* Reply Button */}
      <div className="mt-2 flex justify-start">
        <button className="text-blue-500 hover:underline text-sm">Reply</button>
      </div>
    </div>
  );
};

export default ProductReviewItem;
