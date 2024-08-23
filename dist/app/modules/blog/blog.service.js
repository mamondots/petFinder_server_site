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
exports.BlogService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const blog_constant_1 = require("./blog.constant");
const createBlogIntoDB = (userData, blogData) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.userId
        },
    });
    const result = yield prisma_1.default.blog.create({
        data: blogData,
    });
    return result;
});
const publishedBlogIntoDB = (userData, blogId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.userId,
            isDeleted: false,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    const result = yield prisma_1.default.blog.update({
        where: {
            id: blogId,
        },
        data: {
            status: client_1.BlogStatus.PUBLISHED,
        },
    });
    return result;
});
const getAllBlogsFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: blog_constant_1.blogSearchAbleFields.map((field) => ({
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
    const result = yield prisma_1.default.blog.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                publishedAt: "asc",
            },
        include: {
            author: true,
            comment: true,
        },
    });
    const total = yield prisma_1.default.blog.count({
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
const getMyBlogsFromDB = (params, options, userData) => __awaiter(void 0, void 0, void 0, function* () {
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
            OR: blog_constant_1.blogSearchAbleFields.map((field) => ({
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
    const result = yield prisma_1.default.blog.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                publishedAt: "asc",
            },
        include: {
            author: true,
            comment: true,
        },
    });
    const total = yield prisma_1.default.blog.count({
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
const getABlogIntoDB = (blogId, userData) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield prisma_1.default.blog.findUnique({
        where: {
            id: blogId,
        },
        include: {
            author: true,
            comment: true,
        },
    });
    return result;
});
const updateBlogIntoDB = (userData, blogId, data) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield prisma_1.default.blog.update({
        where: {
            id: blogId,
        },
        data,
        include: {
            author: true,
            comment: true,
        },
    });
    return result;
});
const deleteBlogIntoDB = (userData, blogId) => __awaiter(void 0, void 0, void 0, function* () {
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
    return yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const deleteBlog = yield prisma_1.default.blog.delete({
            where: {
                id: blogId,
            },
        });
        //* delete blog comment
        yield transactionClient.comment.deleteMany({
            where: {
                blogId: blogId,
            },
        });
        return deleteBlog;
    }));
});
exports.BlogService = {
    createBlogIntoDB,
    publishedBlogIntoDB,
    getAllBlogsFromDB,
    getMyBlogsFromDB,
    getABlogIntoDB,
    updateBlogIntoDB,
    deleteBlogIntoDB,
};
