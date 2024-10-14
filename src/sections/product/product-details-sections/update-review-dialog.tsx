// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
//   Alert,
//   Rating,
//   IconButton,
// } from "@mui/material";
// import {
//   useAddCommentMutation,
//   useUpdateCommentMutation,
// } from "@/redux/reducers/comment/commentApi";
// import { useAppSelector } from "@/redux/hooks";
// import toast from "react-hot-toast";
// import { LoadingButton } from "@mui/lab";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { commentSchema } from "@/validations/comment-validation";
// import FormProvider, { RHFTextField } from "@/components/react-hook-form";
// import { BooleanState } from "@/types/utils";
// import { Close } from "@mui/icons-material";
// import { IoImagesOutline } from "react-icons/io5";
// import { IComment } from "@/types/comment";

// const MAX_IMAGES = 3;

// interface Props {
//   productId: string;
//   comment: IComment;
//   dialog: BooleanState;
// }

// const UpdateProductReviewDialog = ({ productId, dialog, comment }: Props) => {
//   const [updateComment, { isLoading }] = useUpdateCommentMutation();
//   const { user } = useAppSelector((state) => state.auth);
//   const [rating, setRating] = useState<number | null>(null);

//   const methods = useForm({
//     resolver: zodResolver(commentSchema),
//     defaultValues: { ...comment },
//   });

//   const {
//     handleSubmit,
//     formState: { errors },
//   } = methods;

//   console.log("err", errors);

//   const [selectedImages, setSelectedImages] = useState<File[]>([]);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const generateFileHash = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (reader.result) {
//           const hash = btoa(reader.result as string);
//           resolve(hash);
//         } else {
//           reject("Failed to generate hash");
//         }
//       };
//       reader.readAsBinaryString(file);
//     });
//   };

//   const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       const files = Array.from(event.target.files);

//       // Check if the total number of images exceeds the limit
//       if (files.length + selectedImages.length > MAX_IMAGES) {
//         setErrorMessage(
//           `You can only upload a maximum of ${MAX_IMAGES} images.`
//         );
//         return;
//       }

//       const newFiles: File[] = [];
//       const selectedImagesHashes = await Promise.all(
//         selectedImages.map((file) => generateFileHash(file))
//       );

//       for (const file of files) {
//         const fileHash = await generateFileHash(file);
//         const isDuplicate = selectedImagesHashes.includes(fileHash);

//         if (!isDuplicate) {
//           newFiles.push(file);
//         } else {
//           setErrorMessage(
//             "Duplicate image detected. Please select a different image."
//           );
//         }
//       }

//       setSelectedImages((prevImages) => [...prevImages, ...newFiles]);
//     }
//   };

//   const removeImage = (index: number) => {
//     setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };

//   const onSubmit = handleSubmit(async (data) => {
//     const formData = new FormData();

//     const payload = {
//       type: selectedImages.length > 0 ? "IMAGE" : "TEXT",
//       product: productId,
//       author: user?._id,
//       rating,
//       content: data.content,
//     };

//     // Append form fields
//     formData.append("data", JSON.stringify(payload));

//     // Append files
//     selectedImages.forEach((file, index) => {
//       formData.append("files", file);
//     });
//     try {
//       const response = await updateComment({
//         commentId: comment._id as string,
//         body: formData,
//       }).unwrap();
//       if (response.success) {
//         toast.success(response.message);
//         setSelectedImages([]);
//         dialog.setFalse();
//       } else {
//         toast.error(response.message);
//       }
//     } catch (error: any) {
//       console.error("Error submitting form:", error);
//       toast.error(error.data.message);
//     }
//   });

//   const handleCloseError = () => {
//     setErrorMessage(null);
//   };
//   return (
//     <Dialog
//       open={dialog.value}
//       onClose={dialog.setFalse}
//       fullWidth
//       maxWidth="xs"
//     >
//       <DialogTitle
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <h2>Add a Review</h2>
//         <IconButton onClick={dialog.setFalse}>
//           <Close />
//         </IconButton>
//       </DialogTitle>
//       <FormProvider methods={methods} onSubmit={onSubmit}>
//         <DialogContent>
//           <RHFTextField label="Your review" name="content" rows={3} multiline />
//           <div className="mt-5">
//             <h2 className="text-sm font-semibold mb-2">Rate this product!!</h2>
//             <Rating
//               name="rating"
//               value={rating}
//               onChange={(event, newValue) => {
//                 setRating(newValue);
//               }}
//               precision={0.5}
//               size="large"
//               sx={{
//                 mb: 3,
//               }}
//             />
//           </div>
//           <input
//             accept="image/*"
//             style={{ display: "none" }}
//             id="upload-image"
//             type="file"
//             multiple
//             onChange={onImageChange}
//           />
//           <label htmlFor="upload-image">
//             <Button
//               variant="contained"
//               component="span"
//               size="small"
//               color="info"
//               sx={{
//                 textTransform: "capitalize",
//               }}
//               startIcon={<IoImagesOutline />}
//             >
//               Attach
//             </Button>
//           </label>

//           {selectedImages.length > 0 && (
//             <div className="mt-5 flex items-center gap-3 flex-wrap">
//               {selectedImages.map((file, index) => (
//                 <div
//                   key={index}
//                   className="h-20 w-20 rounded-2xl relative border p-2"
//                 >
//                   <img
//                     src={URL.createObjectURL(file)}
//                     alt={`Preview ${index}`}
//                     className="h-full w-full object-contain"
//                   />
//                   <div
//                     onClick={() => removeImage(index)}
//                     className="h-6 w-6 rounded-full text-red-500 border border-red-500 absolute -right-2 -top-2 bg-red-100 flex items-center justify-center"
//                   >
//                     <Close className="text-sm" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {errorMessage && (
//             <Alert onClose={handleCloseError} severity="error" className="mt-5">
//               {errorMessage}
//             </Alert>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={dialog.setFalse} color="inherit">
//             Cancel
//           </Button>
//           <LoadingButton
//             type="submit"
//             color="success"
//             variant="contained"
//             loading={isLoading}
//             disabled={isLoading}
//           >
//             Submit
//           </LoadingButton>
//         </DialogActions>
//       </FormProvider>
//     </Dialog>
//   );
// };

// export default UpdateProductReviewDialog;
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Alert,
  Rating,
  IconButton,
} from "@mui/material";
import { useUpdateCommentMutation } from "@/redux/reducers/comment/commentApi";
import { useAppSelector } from "@/redux/hooks";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/validations/comment-validation";
import FormProvider, { RHFTextField } from "@/components/react-hook-form";
import { BooleanState } from "@/types/utils";
import { Close } from "@mui/icons-material";
import { IoImagesOutline } from "react-icons/io5";
import { IComment } from "@/types/comment";

const MAX_IMAGES = 3;

interface Props {
  productId: string;
  comment: IComment;
  dialog: BooleanState;
}

const UpdateProductReviewDialog = ({ productId, dialog, comment }: Props) => {
  const [updateComment, { isLoading }] = useUpdateCommentMutation();
  const { user } = useAppSelector((state) => state.auth);
  const [rating, setRating] = useState<number | null>(comment.rating || null);

  const methods = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: { ...comment },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [currentImages, setCurrentImages] = useState<string[]>(
    comment.imageUrls || []
  );
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newFiles = files.slice(0, MAX_IMAGES - selectedImages.length); // Only allow up to MAX_IMAGES
      if (newFiles.length + selectedImages.length > MAX_IMAGES) {
        setErrorMessage(`You can upload up to ${MAX_IMAGES} images.`);
        return;
      }
      setSelectedImages((prev) => [...prev, ...newFiles]);
    }
  };

  const removeNewImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeCurrentImage = (imageUrl: string) => {
    setCurrentImages((prev) => prev.filter((img) => img !== imageUrl));
  };

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    const payload = {
      type: selectedImages.length > 0 ? "IMAGE" : "TEXT",
      product: productId,
      author: user?._id,
      rating,
      content: data.content,
      ...(comment.imageUrls &&
        comment?.imageUrls?.length > currentImages.length && {
          imageUrls: currentImages,
        }),
    };

    // Append form fields
    formData.append("data", JSON.stringify(payload));

    // Append only new images (if any)
    if (selectedImages.length > 0) {
      selectedImages.forEach((file) => {
        formData.append("files", file);
      });
    }

    try {
      const response = await updateComment({
        commentId: comment._id as string,
        body: formData,
      }).unwrap();
      if (response.success) {
        toast.success(response.message);
        dialog.setFalse();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  });

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
        <h2>Update Review</h2>
        <IconButton onClick={dialog.setFalse}>
          <Close />
        </IconButton>
      </DialogTitle>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <RHFTextField label="Your review" name="content" rows={3} multiline />
          <div className="mt-5">
            <h2 className="text-sm font-semibold mb-2">Rate this product!</h2>
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              precision={0.5}
              size="large"
              sx={{ mb: 3 }}
            />
          </div>
          {/* Image uploader */}
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
              sx={{ textTransform: "capitalize" }}
              startIcon={<IoImagesOutline />}
            >
              Attach
            </Button>
          </label>

          {/* Display newly selected images */}
          {selectedImages.length > 0 && (
            <div className="mt-5">
              <h2 className="text-lg font-semibold">Selected Images</h2>
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
                      onClick={() => removeNewImage(index)}
                      className="h-6 w-6 rounded-full text-red-500 border border-red-500 absolute -right-2 -top-2 bg-red-100 flex items-center justify-center"
                    >
                      <Close className="text-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {errorMessage && (
            <Alert
              severity="error"
              className="mt-5"
              onClose={() => setErrorMessage(null)}
            >
              {errorMessage}
            </Alert>
          )}

          {/* Display current images */}
          {currentImages.length > 0 && (
            <div className="mt-5">
              <h2 className="text-lg font-semibold">Current Images</h2>
              <div className="mt-5 flex items-center gap-3 flex-wrap">
                {currentImages.map((url, index) => (
                  <div
                    key={index}
                    className="h-20 w-20 rounded-2xl relative border p-2"
                  >
                    <img
                      src={url}
                      alt={`Current image ${index}`}
                      className="h-full w-full object-contain"
                    />
                    <div
                      onClick={() => removeCurrentImage(url)}
                      className="h-6 w-6 rounded-full text-red-500 border border-red-500 absolute -right-2 -top-2 bg-red-100 flex items-center justify-center"
                    >
                      <Close className="text-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
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

export default UpdateProductReviewDialog;
