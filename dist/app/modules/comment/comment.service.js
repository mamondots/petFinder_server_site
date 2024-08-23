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
exports.CommentService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const comment_constant_1 = require("./comment.constant");
const createCommentIntoDB = (userData, commentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId, userId } = commentData;
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.userId,
            isDeleted: false,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    yield prisma_1.default.blog.findUniqueOrThrow({
        where: {
            id: blogId,
        },
    });
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
    });
    const result = yield prisma_1.default.comment.create({
        data: commentData,
    });
    return result;
});
const getAllCommentsFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: comment_constant_1.commentSearchAbleFields.map((field) => ({
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
    const result = yield prisma_1.default.comment.findMany({
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
            author: true,
            blog: true,
        },
    });
    const total = yield prisma_1.default.comment.count({
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
const getMyCommentsFromDB = (params, options, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (userData === null || userData === void 0 ? void 0 : userData.role) {
        andConditions.push({
            author: {
                id: userData.userId,
            },
        });
    }
    if (params.searchTerm) {
        andConditions.push({
            OR: comment_constant_1.commentSearchAbleFields.map((field) => ({
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
    const result = yield prisma_1.default.comment.findMany({
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
            author: true,
            blog: true,
        },
    });
    const total = yield prisma_1.default.comment.count({
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
const getACommentIntoDB = (commentId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.userId,
            isDeleted: false,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    yield prisma_1.default.comment.findUniqueOrThrow({
        where: {
            id: commentId,
        },
    });
    const result = yield prisma_1.default.comment.findUnique({
        where: {
            id: commentId,
        },
        include: {
            author: true,
            blog: true,
        },
    });
    return result;
});
const updateCommentIntoDB = (userData, commentId, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.userId,
            isDeleted: false,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    yield prisma_1.default.comment.findUniqueOrThrow({
        where: {
            id: commentId,
        },
    });
    const result = yield prisma_1.default.comment.update({
        where: {
            id: commentId,
        },
        data,
        include: {
            author: true,
            blog: true,
        },
    });
    return result;
});
const deleteCommentIntoDB = (userData, commentId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.userId,
            isDeleted: false,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    yield prisma_1.default.comment.findUniqueOrThrow({
        where: {
            id: commentId,
        },
    });
    const result = yield prisma_1.default.comment.delete({
        where: {
            id: commentId,
        },
    });
    return result;
});
exports.CommentService = {
    createCommentIntoDB,
    getAllCommentsFromDB,
    getMyCommentsFromDB,
    getACommentIntoDB,
    updateCommentIntoDB,
    deleteCommentIntoDB,
};
