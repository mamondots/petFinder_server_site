import { z } from "zod";

const createDonationSchema = z.object({
  body: z.object({
    amount: z.string({
      required_error: "Comment amount is required!",
    }),
    currency: z.string({
      required_error: "Donate currency is required!",
    }),
    donorName: z.string({
      required_error: "Donate name is required!",
    }),
    donorEmail: z.string({
      required_error: "Donate email is required!",
    }),
    message: z.string({
      required_error: "Donate message is required!",
    }),
  }),
});

const updateDonationSchema = z.object({
  body: z.object({
    amount: z.string({
        required_error: "Comment amount is required!",
      }).optional(),
      currency: z.string({
        required_error: "Donate currency is required!",
      }).optional(),
      donorName: z.string({
        required_error: "Donate name is required!",
      }).optional(),
      donorEmail: z.string({
        required_error: "Donate email is required!",
      }).optional(),
      message: z.string({
        required_error: "Donate message is required!",
      }).optional(),
  }),
});

export const donationValidation = {
    createDonationSchema,
    updateDonationSchema,
};
