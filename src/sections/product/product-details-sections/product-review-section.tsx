import React, { useState } from "react";
import { Icon } from "@iconify-icon/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Skeleton,
} from "@mui/material";
import {
  useAddCommentMutation,
  useGetCommentQuery,
} from "@/redux/reducers/comment/commentApi";
import useBoolean from "@/hooks/use-boolean";
import { IProduct } from "@/types/products";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import AuthModal from "@/layouts/common/modal/auth-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/validations/comment-validation";
import { useRouter } from "next/navigation";

interface ReviewTabProps {
  activeTab: string;
  questions: number;
  product: IProduct;
}

const ReviewSection: React.FC<ReviewTabProps> = ({
  activeTab,
  questions,
  product,
}) => {
  const reviewModal = useBoolean();
  const { data, isFetching } = useGetCommentQuery({ productId: product._id });
  const { user } = useAppSelector((state) => state.auth);

  const [createComment, { isLoading }] = useAddCommentMutation();

  const dialog = useBoolean();
  const commentDialog = useBoolean();

  const methods = useForm({
    resolver: zodResolver(commentSchema),
  });
  const dispatch = useAppDispatch();

  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await createComment(data).unwrap();
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.data.message);
    }
  });

  // Open the dialog
  const handleClickOpen = () => {
    if (!user) {
      dialog.setTrue();
    } else {
      commentDialog.setTrue();
    }
  };

  return (
    <div id="reviews" className={`bg-white px-5 pt-5 pb-7 shadow-sm mt-6`}>
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
          onClick={handleClickOpen} // Open dialog on click
          className="border-2 border-green-700 rounded px-5 py-2 hover:bg-green-700 text-green-700 hover:text-white transition-all duration-200 ease-in text-md font-semibold cursor-pointer"
        >
          Write a Review
        </button>
      </div>

      <div className="border-t pt-5">
        {isFetching ? (
          <div className="flex flex-col gap-4">
            {/* Skeleton loaders */}
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Skeleton variant="circular" width={40} height={40} />
                <div className="flex-1">
                  <Skeleton variant="text" width="70%" height={20} />
                  <Skeleton variant="text" width="50%" height={20} />
                </div>
              </div>
            ))}
          </div>
        ) : data?.data.length === 0 ? (
          // No comments found
          <div className="flex items-center justify-center flex-col w-full py-9">
            <div className="bg-indigo-100 h-20 w-20 rounded-full flex items-center justify-center">
              <Icon
                icon="material-symbols-light:rate-review-outline-sharp"
                className="text-4xl"
              />
            </div>
            <p className="text-md text-gray-500 pt-5">
              This product has no reviews yet. Be the first one to write a
              review.
            </p>
          </div>
        ) : (
          // Comments list
          <div className="flex flex-col gap-5">
            {data?.data.map((comment: any) => (
              <div key={comment._id} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <Icon
                    icon="mdi:account-circle"
                    className="text-2xl text-gray-500"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-md">
                    {comment.author.name}
                  </h4>
                  <p className="text-sm text-gray-600">{comment.content}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MUI Dialog for adding a comment */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Add a Review</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Your Review"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <LoadingButton
            onClick={handleSubmit}
            color="success"
            variant="contained"
            loading={isLoading}
            disabled={isLoading}
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <AuthModal dialog={dialog} />
    </div>
  );
};

export default ReviewSection;
