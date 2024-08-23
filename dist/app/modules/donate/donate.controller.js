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
exports.donateController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const donate_constant_1 = require("./donate.constant");
const donate_service_1 = require("./donate.service");
const createDonation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield donate_service_1.DonationService.createDonationIntoDB(req === null || req === void 0 ? void 0 : req.user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Donation added successfully!",
        data: result,
    });
}));
const getAllDonation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, donate_constant_1.donateFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield donate_service_1.DonationService.getAllDonationsFromDB(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Donations retrieved successfully!",
        meta: result.meta,
        data: result.data,
    });
}));
const getDonationsByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, donate_constant_1.donateSearchAbleFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield donate_service_1.DonationService.getUserDonationsFromDB(filters, options, req === null || req === void 0 ? void 0 : req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Get donation by user retrieved successfully!",
        meta: result.meta,
        data: result.data,
    });
}));
const getADonation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { donateId } = req.params;
    const result = yield donate_service_1.DonationService.getADonationIntoDB(donateId, req === null || req === void 0 ? void 0 : req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Get a donation retrieved successfully!",
        data: result,
    });
}));
const updateADonate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { donateId } = req.params;
    const result = yield donate_service_1.DonationService.updateDonationIntoDB(req === null || req === void 0 ? void 0 : req.user, donateId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Donation history updated successfully!",
        data: result,
    });
}));
const deleteADonate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { donateId } = req.params;
    const result = yield donate_service_1.DonationService.deleteDonationIntoDB(req === null || req === void 0 ? void 0 : req.user, donateId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Donation history deleted successfully!",
        data: result,
    });
}));
exports.donateController = {
    createDonation,
    getAllDonation,
    getDonationsByUser,
    getADonation,
    updateADonate,
    deleteADonate,
};
