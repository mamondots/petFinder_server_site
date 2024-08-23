"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationValidation = void 0;
const zod_1 = require("zod");
const createDonationSchema = zod_1.z.object({
    body: zod_1.z.object({
        amount: zod_1.z.string({
            required_error: "Comment amount is required!",
        }),
        currency: zod_1.z.string({
            required_error: "Donate currency is required!",
        }),
        donorName: zod_1.z.string({
            required_error: "Donate name is required!",
        }),
        donorEmail: zod_1.z.string({
            required_error: "Donate email is required!",
        }),
        message: zod_1.z.string({
            required_error: "Donate message is required!",
        }),
    }),
});
const updateDonationSchema = zod_1.z.object({
    body: zod_1.z.object({
        amount: zod_1.z.string({
            required_error: "Comment amount is required!",
        }).optional(),
        currency: zod_1.z.string({
            required_error: "Donate currency is required!",
        }).optional(),
        donorName: zod_1.z.string({
            required_error: "Donate name is required!",
        }).optional(),
        donorEmail: zod_1.z.string({
            required_error: "Donate email is required!",
        }).optional(),
        message: zod_1.z.string({
            required_error: "Donate message is required!",
        }).optional(),
    }),
});
exports.donationValidation = {
    createDonationSchema,
    updateDonationSchema,
};
