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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptionRequestService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createIntoDB = (userData, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.userId,
            status: client_1.UserStatus.ACTIVE,
            isDeleted: false,
        },
    });
    yield prisma_1.default.pet.findUniqueOrThrow({
        where: {
            id: data === null || data === void 0 ? void 0 : data.petId,
        },
    });
    const adaptionData = Object.assign({ userId: userData === null || userData === void 0 ? void 0 : userData.userId }, data);
    const result = yield prisma_1.default.adoptionRequest.create({
        data: adaptionData,
    });
    return result;
});
const getAllFromDB = (params, options, userData) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.userId,
            status: client_1.UserStatus.ACTIVE,
            isDeleted: false,
        },
    });
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.adoptionRequest.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: "asc",
            },
        include: {
            user: true,
            pet: true,
        },
    });
    const total = yield prisma_1.default.adoptionRequest.count({
        where: whereConditions,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getMyAllFromDB = (params, options, userData) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.userId,
            status: client_1.UserStatus.ACTIVE,
            isDeleted: false,
        },
    });
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (userData === null || userData === void 0 ? void 0 : userData.role) {
        andConditions.push({
            user: {
                id: userData.userId,
            },
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.adoptionRequest.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: "asc",
            },
        include: {
            user: true,
            pet: true,
        },
    });
    const total = yield prisma_1.default.adoptionRequest.count({
        where: whereConditions,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateIntoDB = (requestId, data, userData) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.userId,
            status: client_1.UserStatus.ACTIVE,
            isDeleted: false,
        },
    });
    yield prisma_1.default.adoptionRequest.findUniqueOrThrow({
        where: {
            id: requestId,
        },
    });
    const result = yield prisma_1.default.adoptionRequest.update({
        where: {
            id: requestId,
        },
        data,
        include: {
            user: true,
            pet: true,
        },
    });
    return result;
});
const updateStatusIntoDB = (requestId, status, userData) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.userId,
            status: client_1.UserStatus.ACTIVE,
            isDeleted: false,
        },
    });
    yield prisma_1.default.adoptionRequest.findUniqueOrThrow({
        where: {
            id: requestId,
        },
    });
    const result = yield prisma_1.default.adoptionRequest.update({
        where: {
            id: requestId,
        },
        data: {
            status: status,
        },
        include: {
            user: true,
            pet: true,
        },
    });
    return result;
});
const deleteIntoDB = (userData, requestId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.userId,
            isDeleted: false,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    yield prisma_1.default.adoptionRequest.findUniqueOrThrow({
        where: {
            id: requestId,
        },
    });
    const result = yield prisma_1.default.adoptionRequest.delete({
        where: {
            id: requestId,
        },
    });
    return result;
});
exports.adoptionRequestService = {
    createIntoDB,
    getAllFromDB,
    getMyAllFromDB,
    updateIntoDB,
    updateStatusIntoDB,
    deleteIntoDB,
};
