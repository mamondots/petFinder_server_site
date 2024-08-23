"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidation = void 0;
const zod_1 = require("zod");
const createBlogSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: "User id is required!",
        }),
        title: zod_1.z.string({
            required_error: "Blog title is required!",
        }),
        description: zod_1.z.string({
            required_error: "Blog description is required!",
        }),
        image: zod_1.z.string({
            required_error: "Blog image is required!",
        }),
        reference: zod_1.z.string({
            required_error: "Blog reference is required!",
        }),
        tags: zod_1.z.array(zod_1.z.string({
            required_error: "Blog tags is required!",
        })),
        category: zod_1.z.string({
            required_error: "Blog category is required!",
        })
    }),
});
const updateBlogSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Blog title is required!",
        }).optional(),
        description: zod_1.z.string({
            required_error: "Blog description is required!",
        }).optional(),
        image: zod_1.z.string({
            required_error: "Blog image is required!",
        }).optional(),
        reference: zod_1.z.string({
            required_error: "Blog reference is required!",
        }).optional(),
        tags: zod_1.z.array(zod_1.z.string({
            required_error: "Blog tags is required!",
        })).optional(),
        category: zod_1.z.string({
            required_error: "Blog category is required!",
        }).optional(),
        status: zod_1.z.string({
            required_error: "Blog status is required!",
        }).optional(),
        like: zod_1.z.number({
            required_error: "Blog views is required!",
        }).optional(),
    }),
});
exports.blogValidation = {
    createBlogSchema,
    updateBlogSchema,
};
