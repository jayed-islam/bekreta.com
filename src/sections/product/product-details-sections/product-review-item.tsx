import React, { useState } from "react";
import { Icon } from "@iconify-icon/react";
import { Rating, Typography, IconButton, Collapse } from "@mui/material";
import { IComment } from "@/types/comment";
import { IUser } from "@/types/auth";
import UpdateProductReviewDialog from "./update-review-dialog";
import useBoolean from "@/hooks/use-boolean";

interface Props {
  comment: IComment;
  user: IUser;
  productId?: string;
}

const ProductReviewItem = ({ comment, user, productId }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage((prev) => (prev === imageUrl ? null : imageUrl));
  };

  const dialog = useBoolean();

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
        {/* {user?._id === comment.author._id && (
          <div className="flex space-x-2" onClick={dialog.setTrue}>
            <IconButton size="small">
              <Icon icon="mdi:pencil" />
            </IconButton>
            <IconButton size="small">
              <Icon icon="mdi:delete" />
            </IconButton>
          </div>
        )} */}
      </div>

      {/* Review Content */}
      <Typography variant="body2" className="mt-2 text-gray-600">
        {comment.content}
      </Typography>

      {/* Image Gallery */}
      {comment.imageUrls && comment.imageUrls.length > 0 && (
        <div className="mt-3 flex gap-2">
          {comment.imageUrls.map((imageUrl: string, index: number) => (
            <div
              className={`w-20 h-20 border-gray-200 border rounded-lg ${
                selectedImage === imageUrl ? "border-primary shadow" : ""
              }`}
            >
              <img
                key={index}
                src={imageUrl}
                alt="Review Image"
                className={` object-contain rounded-lg cursor-pointer h-full w-full`}
                onClick={() => handleImageClick(imageUrl)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Collapsible Full Image View */}
      <Collapse in={!!selectedImage}>
        {selectedImage && (
          <div className="mt-4 w-full md:w-1/2 h-72 rounded-lg border border-gray-200">
            <img
              src={selectedImage}
              alt="Selected Review"
              className="object-contain rounded-lg h-full w-full"
            />
          </div>
        )}
      </Collapse>

      {/* Reply Button */}
      {/* <div className="mt-2 flex justify-start">
        <button className="text-blue-500 hover:underline text-sm">Reply</button>
      </div> */}
      <UpdateProductReviewDialog
        dialog={dialog}
        comment={comment}
        productId={productId as string}
      />
    </div>
  );
};

export default ProductReviewItem;
