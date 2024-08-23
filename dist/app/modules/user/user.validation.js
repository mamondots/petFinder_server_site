"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required!",
        }),
        email: zod_1.z.string({
            required_error: "Email is required!",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        contactNumber: zod_1.z.string({
            required_error: "Contact number is required!",
        }),
        address: zod_1.z.string({
            required_error: "Address is required",
        }),
    }),
});
const updateUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name is required!",
        })
            .optional(),
        email: zod_1.z
            .string({
            required_error: "Email is required!",
        })
            .optional(),
        profilePhoto: zod_1.z
            .string({
            required_error: "Profile photo is required!",
        })
            .optional(),
        contactNumber: zod_1.z
            .string({
            required_error: "Contact number is required!",
        })
            .optional(),
        address: zod_1.z
            .string({
            required_error: "Address is required",
        })
            .optional(),
    }),
});
const updateStatus = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([client_1.UserStatus.ACTIVE, client_1.UserStatus.BLOCKED, client_1.UserStatus.DELETED]),
    }),
});
const updateRole = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum([client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.USER]),
    }),
});
exports.userValidation = {
    createUser,
    updateUser,
    updateStatus,
    updateRole,
};
