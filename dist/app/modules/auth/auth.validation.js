"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const loginUser = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "User email is required!",
        }),
        password: zod_1.z.string({
            required_error: "User password is required",
        }),
    }),
});
const changePassword = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: "User old password is required!",
        }),
        newPassword: zod_1.z.string({
            required_error: "User new password is required!",
        }),
    }),
});
const forgotPassword = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "User email is required!",
        }),
    }),
});
const resetPassword = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "User id is required!",
        }),
        password: zod_1.z.string({
            required_error: "User password is required!",
        }),
    }),
});
exports.authValidation = {
    loginUser,
    changePassword,
    forgotPassword,
    resetPassword,
};
