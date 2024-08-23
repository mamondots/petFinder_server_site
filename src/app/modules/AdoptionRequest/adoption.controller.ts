import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { adoptionRequestService } from "./adoption.service";
import { RequestWithUser } from "../../interfaces";
import pick from "../../../shared/pick";
import { adoptFilterableFields } from "./adoption.constant";

const createAdoptionRequest = catchAsync(async (req, res) => {
  const result = await adoptionRequestService.createIntoDB(
    (req as RequestWithUser)?.user,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Adoption request submitted successfully!",
    data: result,
  });
});

const getAllAdoptionRequest = catchAsync(async (req, res) => {
  const filters = pick(req.query, adoptFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await adoptionRequestService.getAllFromDB(
    filters, options, (req as RequestWithUser)?.user
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Adoption requests retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const getMyAdoptionRequest = catchAsync(async (req, res) => {
  const filters = pick(req.query, adoptFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await adoptionRequestService.getMyAllFromDB(
    filters, options, (req as RequestWithUser)?.user
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My all adoption requests retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const updateAAdoptionRequest = catchAsync(async (req, res) => {
  const { requestId } = req.params;
  const result = await adoptionRequestService.updateIntoDB(
    requestId,
    req.body,
    (req as RequestWithUser)?.user
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Adoption request updated successfully!",
    data: result,
  });
});

const updateAdoptionRequestStatus = catchAsync(async (req, res) => {
  const { requestId } = req.params;
  const result = await adoptionRequestService.updateIntoDB(
    requestId,
    req.body,
    (req as RequestWithUser)?.user
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Adoption request status successfully!",
    data: result,
  });
});

const deleteAAdoptionRequest = catchAsync(async (req, res) => {
  const { requestId } = req.params;
  const result = await adoptionRequestService.deleteIntoDB((req as RequestWithUser)?.user, requestId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Adoption request deleted successfully!",
    data: result,
  });
});

export const adoptionRequestController = {
  createAdoptionRequest,
  getAllAdoptionRequest,
  getMyAdoptionRequest,
  updateAAdoptionRequest,
  updateAdoptionRequestStatus,
  deleteAAdoptionRequest
};
