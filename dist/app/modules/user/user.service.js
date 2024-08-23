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
exports.userService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const user_constant_1 = require("./user.constant");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(user.password, 12);
    const userData = {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: client_1.UserRole.USER,
        contactNumber: user.contactNumber,
        address: user.address,
    };
    const result = yield prisma_1.default.user.create({
        data: userData,
    });
    const { password: _ } = result, userDataWithoutPassword = __rest(result, ["password"]);
    return userDataWithoutPassword;
});
const getAllFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (params.searchTerm) {
        andConditions.push({
            OR: user_constant_1.userSearchAbleFields.map((field) => ({
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
    const result = yield prisma_1.default.user.findMany({
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
        select: {
            id: true,
            name: true,
            email: true,
            profilePhoto: true,
            role: true,
            contactNumber: true,
            address: true,
            gender: true,
            isDeleted: true,
            status: true,
            // createdAt: true,
            // updatedAt: true,
            // adoptionRequest: true,
            // pet: true,
        },
    });
    const total = yield prisma_1.default.user.count({
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
const getMyProfileFromDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.userId,
            isDeleted: false,
            status: client_1.UserStatus.ACTIVE,
        },
        select: {
            id: true,
            name: true,
            email: true,
            profilePhoto: true,
            role: true,
            isDeleted: true,
            status: true,
            contactNumber: true,
            address: true,
            gender: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
const updateProfileIntoDB = (userData, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.userId,
            isDeleted: false,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    const result = yield prisma_1.default.user.update({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.userId,
            isDeleted: false,
            status: client_1.UserStatus.ACTIVE,
        },
        data,
        select: {
            id: true,
            name: true,
            email: true,
            profilePhoto: true,
            role: true,
            contactNumber: true,
            address: true,
            gender: true,
            isDeleted: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
const changeUserRole = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    const updateUserRole = yield prisma_1.default.user.update({
        where: {
            id,
            isDeleted: false,
            status: client_1.UserStatus.ACTIVE,
        },
        data: role,
        select: {
            id: true,
            name: true,
            email: true,
            profilePhoto: true,
            role: true,
            contactNumber: true,
            address: true,
            gender: true,
            isDeleted: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return updateUserRole;
});
const changeUserStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const updateUserStatus = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: status,
        select: {
            id: true,
            name: true,
            email: true,
            profilePhoto: true,
            role: true,
            contactNumber: true,
            address: true,
            gender: true,
            isDeleted: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return updateUserStatus;
});
const softDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const userSoftDelete = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
            status: client_1.UserStatus.DELETED,
        },
    });
    return userSoftDelete;
});
exports.userService = {
    createUser,
    getAllFromDB,
    getMyProfileFromDB,
    updateProfileIntoDB,
    changeUserRole,
    changeUserStatus,
    softDelete,
};
