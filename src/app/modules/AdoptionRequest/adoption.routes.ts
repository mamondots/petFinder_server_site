import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { adoptionRequestController } from "./adoption.controller";
import { adoptionRequestSchema } from "./adoption.validation";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.USER),
  validateRequest(adoptionRequestSchema.createAdoptionRequest),
  adoptionRequestController.createAdoptionRequest
);

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  adoptionRequestController.getAllAdoptionRequest
);

router.get(
  "/my-adoption",
  auth(UserRole.USER),
  adoptionRequestController.getMyAdoptionRequest
);

router.put(
  "/:requestId",
  auth(UserRole.USER),
  validateRequest(adoptionRequestSchema.updateAdoptionRequest),
  adoptionRequestController.updateAAdoptionRequest
);

router.patch(
  "/:requestId/status",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(adoptionRequestSchema.updateAdoptionRequestStatus),
  adoptionRequestController.updateAdoptionRequestStatus
);

router.delete(
  "/:requestId",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adoptionRequestController.deleteAAdoptionRequest
);

export const adoptionRequestRoutes = router;
