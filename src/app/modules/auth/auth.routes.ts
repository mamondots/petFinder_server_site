import express from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { authValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/login",
  validateRequest(authValidation.loginUser),
  AuthController.loginUser
);

router.post("/refresh-token", AuthController.refreshToken);

router.post(
  "/change-password",
  validateRequest(authValidation.changePassword),
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  AuthController.changePassword
);

router.post(
  "/forgot-password",
  validateRequest(authValidation.forgotPassword),
  AuthController.forgotPassword
);

router.post(
  "/reset-password",
  validateRequest(authValidation.resetPassword),
  AuthController.resetPassword
);

export const AuthRoutes = router;
