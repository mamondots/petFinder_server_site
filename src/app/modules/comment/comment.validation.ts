import { z } from "zod";

const createCommentSchema = z.object({
  body: z.object({
    content: z.string({
      required_error: "Comment content is required!",
    }),
    blogId: z.string({
      required_error: "Comment blogId is required!",
    }),
    userId: z.string({
      required_error: "Comment userId is required!",
    }),
  }),
});

const updateCommentSchema = z.object({
  body: z.object({
    content: z.string({
        required_error: "Comment content is required!",
      }).optional(),
      blogId: z.string({
        required_error: "Comment blogId is required!",
      }).optional(),
      userId: z.string({
        required_error: "Comment userId is required!",
      }).optional(),
  }),
});

export const commentValidation = {
  createCommentSchema,
  updateCommentSchema,
};
