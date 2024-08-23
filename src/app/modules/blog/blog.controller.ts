import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { RequestWithUser } from "../../interfaces";
import { blogFilterableFields, blogSearchAbleFields } from "./blog.constant";
import { BlogService } from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogService.createBlogIntoDB(
    (req as RequestWithUser)?.user,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Blog added successfully!",
    data: result,
  });
});

const publishedBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const result = await BlogService.publishedBlogIntoDB(
    (req as RequestWithUser)?.user,
    blogId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog published successfully!",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const filters = pick(req.query, blogFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await BlogService.getAllBlogsFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blogs retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const getMyBlogs = catchAsync(async (req, res) => {
  const filters = pick(req.query, blogSearchAbleFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await BlogService.getMyBlogsFromDB(
    filters,
    options,
    (req as RequestWithUser)?.user
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My all blogs retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const getABlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const result = await BlogService.getABlogIntoDB(
    blogId,
    (req as RequestWithUser)?.user
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "A blog retrieved successfully!",
    data: result,
  });
});

const updateABlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const result = await BlogService.updateBlogIntoDB(
    (req as RequestWithUser)?.user,
    blogId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog profile updated successfully!",
    data: result,
  });
});

const deleteABlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const result = await BlogService.deleteBlogIntoDB(
    (req as RequestWithUser)?.user,
    blogId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog deleted successfully!",
    data: result,
  });
});

export const blogController = {
  createBlog,
  publishedBlog,
  getAllBlogs,
  getMyBlogs,
  getABlog,
  updateABlog,
  deleteABlog,
};
