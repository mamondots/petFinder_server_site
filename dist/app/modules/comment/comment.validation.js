"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentValidation = void 0;
const zod_1 = require("zod");
const createCommentSchema = zod_1.z.object({
    body: zod_1.z.object({
        content: zod_1.z.string({
            required_error: "Comment content is required!",
        }),
        blogId: zod_1.z.string({
            required_error: "Comment blogId is required!",
        }),
        userId: zod_1.z.string({
            required_error: "Comment userId is required!",
        }),
    }),
});
const updateCommentSchema = zod_1.z.object({
    body: zod_1.z.object({
        content: zod_1.z.string({
            required_error: "Comment content is required!",
        }).optional(),
        blogId: zod_1.z.string({
            required_error: "Comment blogId is required!",
        }).optional(),
        userId: zod_1.z.string({
            required_error: "Comment userId is required!",
        }).optional(),
    }),
});
exports.commentValidation = {
    createCommentSchema,
    updateCommentSchema,
};
