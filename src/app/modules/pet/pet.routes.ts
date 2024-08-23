import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { petValidation } from "./pet.validation";
import { petController } from "./pet.controller";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(petValidation.createPet),
  petController.createPet
);

router.get("/", petController.getAllPets);

router.get(
  "/my-pets",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  petController.getMyPets
);

router.get(
  "/:petId",
  auth(UserRole.ADMIN, UserRole.USER),
  petController.getAPet
);

router.put(
  "/:petId",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(petValidation.updatePet),
  petController.updateAPet
);

router.delete(
  "/:petId",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  petController.deleteAPet
);

export const petRoutes = router;
