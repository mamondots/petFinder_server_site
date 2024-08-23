import { z } from "zod";

const createBlogSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: "User id is required!",
    }),
    title: z.string({
      required_error: "Blog title is required!",
    }),
    description: z.string({
      required_error: "Blog description is required!",
    }),
    image: z.string({
      required_error: "Blog image is required!",
    }),
    reference: z.string({
      required_error: "Blog reference is required!",
    }),
    tags: z.array(z.string({
      required_error: "Blog tags is required!",
    })),
    category: z.string({
      required_error: "Blog category is required!",
    })
  }),
});

const updateBlogSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Blog title is required!",
    }).optional(),
    description: z.string({
      required_error: "Blog description is required!",
    }).optional(),
    image: z.string({
      required_error: "Blog image is required!",
    }).optional(),
    reference: z.string({
      required_error: "Blog reference is required!",
    }).optional(),
    tags: z.array(z.string({
      required_error: "Blog tags is required!",
    })).optional(),
    category: z.string({
      required_error: "Blog category is required!",
    }).optional(),
    status: z.string({
      required_error: "Blog status is required!",
    }).optional(),
    like: z.number({
      required_error: "Blog views is required!",
    }).optional(),
  }),
});

export const blogValidation = {
  createBlogSchema,
  updateBlogSchema,
};
