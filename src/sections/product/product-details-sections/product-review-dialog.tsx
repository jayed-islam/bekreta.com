import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Alert,
  Grid,
  Rating,
  IconButton,
} from "@mui/material";
import { useAddCommentMutation } from "@/redux/reducers/comment/commentApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/validations/comment-validation";
import { useRouter } from "next/navigation";
import FormProvider, { RHFTextField } from "@/components/react-hook-form";
import { BooleanState } from "@/types/utils";
import { AttachFile, Close } from "@mui/icons-material";
import { IoImagesOutline } from "react-icons/io5";

const MAX_IMAGES = 3;

interface Props {
  productId: string;
  dialog: BooleanState;
}

const ProductReviewDialog = ({ productId, dialog }: Props) => {
  const [createComment, { isLoading }] = useAddCommentMutation();
  const { user } = useAppSelector((state) => state.auth);
  const [rating, setRating] = useState<number | null>(null);

  const methods = useForm({
    resolver: zodResolver(commentSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  console.log("err", errors);

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const generateFileHash = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const hash = btoa(reader.result as string);
          resolve(hash);
        } else {
          reject("Failed to generate hash");
        }
      };
      reader.readAsBinaryString(file);
    });
  };

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);

      // Check if the total number of images exceeds the limit
      if (files.length + selectedImages.length > MAX_IMAGES) {
        setErrorMessage(
          `You can only upload a maximum of ${MAX_IMAGES} images.`
        );
        return;
      }

      const newFiles: File[] = [];
      const selectedImagesHashes = await Promise.all(
        selectedImages.map((file) => generateFileHash(file))
      );

      for (const file of files) {
        const fileHash = await generateFileHash(file);
        const isDuplicate = selectedImagesHashes.includes(fileHash);

        if (!isDuplicate) {
          newFiles.push(file);
        } else {
          setErrorMessage(
            "Duplicate image detected. Please select a different image."
          );
        }
      }

      setSelectedImages((prevImages) => [...prevImages, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();

    // data.product = productId;
    // data.author = authorId;

    const payload = {
      type: selectedImages.length > 0 ? "IMAGE" : "TEXT",
      product: productId,
      author: user?._id,
      rating,
      content: data.content,
    };

    // Append form fields
    formData.append("data", JSON.stringify(payload));

    // Append files
    selectedImages.forEach((file, index) => {
      formData.append("files", file);
    });
    try {
      const response = await createComment(formData).unwrap();
      if (response.success) {
        toast.success(response.message);
        setSelectedImages([]);
        dialog.setFalse();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.data.message);
    }
  });

  const handleCloseError = () => {
    setErrorMessage(null);
  };
  return (
    <Dialog
      open={dialog.value}
      onClose={dialog.setFalse}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>Add a Review</h2>
        <IconButton onClick={dialog.setFalse}>
          <Close />
        </IconButton>
      </DialogTitle>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <RHFTextField label="Your review" name="content" rows={3} multiline />
          <div className="mt-5">
            <h2 className="text-sm font-semibold mb-2">Rate this product!!</h2>
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              precision={0.5}
              size="large"
              sx={{
                mb: 3,
              }}
            />
          </div>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-image"
            type="file"
            multiple
            onChange={onImageChange}
          />
          <label htmlFor="upload-image">
            <Button
              variant="contained"
              component="span"
              size="small"
              color="info"
              sx={{
                textTransform: "capitalize",
              }}
              startIcon={<IoImagesOutline />}
            >
              Attach
            </Button>
          </label>

          {selectedImages.length > 0 && (
            <div className="mt-5 flex items-center gap-3 flex-wrap">
              {selectedImages.map((file, index) => (
                <div
                  key={index}
                  className="h-20 w-20 rounded-2xl relative border p-2"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="h-full w-full object-contain"
                  />
                  <div
                    onClick={() => removeImage(index)}
                    className="h-6 w-6 rounded-full text-red-500 border border-red-500 absolute -right-2 -top-2 bg-red-100 flex items-center justify-center"
                  >
                    <Close className="text-sm" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {errorMessage && (
            <Alert onClose={handleCloseError} severity="error" className="mt-5">
              {errorMessage}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={dialog.setFalse} color="inherit">
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            color="success"
            variant="contained"
            loading={isLoading}
            disabled={isLoading}
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default ProductReviewDialog;
