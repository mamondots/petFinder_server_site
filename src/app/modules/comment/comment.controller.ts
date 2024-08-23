import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { RequestWithUser } from "../../interfaces";
import {
  commentFilterableFields,
  commentSearchAbleFields,
} from "./comment.constant";
import { CommentService } from "./comment.service";

const createComment = catchAsync(async (req, res) => {
  const result = await CommentService.createCommentIntoDB((req as RequestWithUser)?.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Comment added successfully!",
    data: result,
  });
});

const getAllComment = catchAsync(async (req, res) => {
  const filters = pick(req.query, commentFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await CommentService.getAllCommentsFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comments retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const getMyComments = catchAsync(async (req, res) => {
  const filters = pick(req.query, commentSearchAbleFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await CommentService.getMyCommentsFromDB(
    filters,
    options,
    (req as RequestWithUser)?.user
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My all comments retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const getAComment = catchAsync(async (req, res) => {
  const { petId } = req.params;

  const result = await CommentService.getACommentIntoDB(petId, (req as RequestWithUser)?.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "A comment retrieved successfully!",
    data: result,
  });
});

const updateAComment = catchAsync(async (req, res) => {
  const { petId } = req.params;

  const result = await CommentService.updateCommentIntoDB(
    (req as RequestWithUser)?.user,
    petId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment updated successfully!",
    data: result,
  });
});

const deleteAComment = catchAsync(async (req, res) => {
  const { petId } = req.params;
  
  const result = await CommentService.deleteCommentIntoDB((req as RequestWithUser)?.user, petId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment deleted successfully!",
    data: result,
  });
});

export const commentController = {
  createComment,
  getAllComment,
  getMyComments,
  getAComment,
  updateAComment,
  deleteAComment,
};
