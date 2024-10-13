import { CommentType } from "@/types/comment";
import { z } from "zod";

export const commentSchema = z
  .object({
    product: z.string({ required_error: "Product ID is required" }),
    author: z.string({ required_error: "Author ID is required" }),
    content: z.string().min(1, "Content cannot be empty").optional(), // Initially optional
    type: z.nativeEnum(CommentType).default(CommentType.TEXT),
    imageUrl: z
      .array(z.string().url({ message: "Must be a valid URL" }))
      .optional(),
  })
  .refine(
    (data) => {
      // Check if the comment type is TEXT and content is provided
      if (data.type === CommentType.TEXT && !data.content) {
        return false; // Invalid if content is required but not provided
      }
      return true; // Valid otherwise
    },
    {
      message: "Content is required for text comments.",
      path: ["content"], // This will show the error message on the content field
    }
  );
