"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptionRequestController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const adoption_service_1 = require("./adoption.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const adoption_constant_1 = require("./adoption.constant");
const createAdoptionRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adoption_service_1.adoptionRequestService.createIntoDB(req === null || req === void 0 ? void 0 : req.user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Adoption request submitted successfully!",
        data: result,
    });
}));
const getAllAdoptionRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, adoption_constant_1.adoptFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield adoption_service_1.adoptionRequestService.getAllFromDB(filters, options, req === null || req === void 0 ? void 0 : req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Adoption requests retrieved successfully!",
        meta: result.meta,
        data: result.data,
    });
}));
const getMyAdoptionRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, adoption_constant_1.adoptFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield adoption_service_1.adoptionRequestService.getMyAllFromDB(filters, options, req === null || req === void 0 ? void 0 : req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "My all adoption requests retrieved successfully!",
        meta: result.meta,
        data: result.data,
    });
}));
const updateAAdoptionRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { requestId } = req.params;
    const result = yield adoption_service_1.adoptionRequestService.updateIntoDB(requestId, req.body, req === null || req === void 0 ? void 0 : req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Adoption request updated successfully!",
        data: result,
    });
}));
const updateAdoptionRequestStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { requestId } = req.params;
    const result = yield adoption_service_1.adoptionRequestService.updateIntoDB(requestId, req.body, req === null || req === void 0 ? void 0 : req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Adoption request status successfully!",
        data: result,
    });
}));
const deleteAAdoptionRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { requestId } = req.params;
    const result = yield adoption_service_1.adoptionRequestService.deleteIntoDB(req === null || req === void 0 ? void 0 : req.user, requestId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Adoption request deleted successfully!",
        data: result,
    });
}));
exports.adoptionRequestController = {
    createAdoptionRequest,
    getAllAdoptionRequest,
    getMyAdoptionRequest,
    updateAAdoptionRequest,
    updateAdoptionRequestStatus,
    deleteAAdoptionRequest
};
