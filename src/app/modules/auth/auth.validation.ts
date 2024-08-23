import { UserRole, UserStatus } from "@prisma/client";
import { z } from "zod";

const loginUser = z.object({
  body: z.object({
    email: z.string({
      required_error: "User email is required!",
    }),
    password: z.string({
      required_error: "User password is required",
    }),
  }),
});

const changePassword = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "User old password is required!",
    }),
    newPassword: z.string({
      required_error: "User new password is required!",
    }),
  }),
});

const forgotPassword = z.object({
  body: z.object({
    email: z.string({
      required_error: "User email is required!",
    }),
  }),
});

const resetPassword = z.object({
  body: z.object({
    id: z.string({
      required_error: "User id is required!",
    }),
    password: z.string({
      required_error: "User password is required!",
    }),
  }),
});

export const authValidation = {
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
};
