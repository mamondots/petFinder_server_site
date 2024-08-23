import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { blogController } from "./blog.controller";
import { blogValidation } from "./blog.validation";

const router = express.Router();

router.post(
  "/add-blog",
  auth(UserRole.USER, UserRole.ADMIN),
  validateRequest(blogValidation.createBlogSchema),
  blogController.createBlog
);

router.patch(
  "/published-blog/:blogId",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  blogController.publishedBlog
);

router.get("/", blogController.getAllBlogs);

router.get(
  "/my-blogs",
  auth(UserRole.USER, UserRole.ADMIN),
  blogController.getMyBlogs
);

router.get(
  "/:blogId",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  blogController.getABlog
);

router.put(
  "/:blogId",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  validateRequest(blogValidation.updateBlogSchema),
  blogController.updateABlog
);

router.delete(
  "/:blogId",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  blogController.deleteABlog
);

export const blogRoutes = router;
