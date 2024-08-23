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
exports.PetService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const pet_constant_1 = require("./pet.constant");
const createPetIntoDB = (userData, petData) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.userId,
            isDeleted: false,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    const result = yield prisma_1.default.pet.create({
        data: petData,
    });
    return result;
});
const getAllPetsFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: pet_constant_1.petSearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
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
    // console.dir(whereConditions, { depth: Infinity });
    const result = yield prisma_1.default.pet.findMany({
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
            adoptionRequest: true,
        },
    });
    const total = yield prisma_1.default.pet.count({
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
const getMyPetsFromDB = (params, options, userData) => __awaiter(void 0, void 0, void 0, function* () {
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
    if (params.searchTerm) {
        andConditions.push({
            OR: pet_constant_1.petSearchAbleFields.map((field) => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: "insensitive",
                },
            })),
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
    // console.dir(whereConditions, {depth: Infinity});
    const result = yield prisma_1.default.pet.findMany({
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
            adoptionRequest: true,
        },
    });
    const total = yield prisma_1.default.pet.count({
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
const getAIntoDB = (petId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.userId,
            isDeleted: false,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    yield prisma_1.default.pet.findUniqueOrThrow({
        where: {
            id: petId,
        },
    });
    const result = yield prisma_1.default.pet.findUnique({
        where: {
            id: petId,
        },
        include: {
            user: true,
            adoptionRequest: true,
        },
    });
    return result;
});
const updateIntoDB = (userData, petId, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.userId,
            isDeleted: false,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    yield prisma_1.default.pet.findUniqueOrThrow({
        where: {
            id: petId,
        },
    });
    const result = yield prisma_1.default.pet.update({
        where: {
            id: petId,
        },
        data,
        include: {
            user: true,
        },
    });
    return result;
});
const deleteIntoDB = (userData, petId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.userId,
            isDeleted: false,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    yield prisma_1.default.pet.findUniqueOrThrow({
        where: {
            id: petId,
        },
    });
    return yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const deletePet = yield transactionClient.pet.delete({
            where: {
                id: petId,
            },
        });
        //* delete adoption request
        yield transactionClient.adoptionRequest.deleteMany({
            where: {
                petId: petId,
            },
        });
        return deletePet;
    }));
});
exports.PetService = {
    createPetIntoDB,
    getAllPetsFromDB,
    getMyPetsFromDB,
    getAIntoDB,
    updateIntoDB,
    deleteIntoDB,
};
