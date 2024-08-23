import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { commentValidation } from "./comment.validation";
import { commentController } from "./comment.controller";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.USER),
  validateRequest(commentValidation.createCommentSchema),
  commentController.createComment
);

router.get("/", commentController.getAllComment);

router.get(
  "/my-comments",
  auth(UserRole.USER),
  commentController.getMyComments
);

router.get("/:commentId", auth(UserRole.USER), commentController.getAComment);

router.put(
  "/:commentId",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  validateRequest(commentValidation.updateCommentSchema),
  commentController.updateAComment
);

router.delete(
  "/:commentId",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  commentController.deleteAComment
);

export const commentRoutes = router;
