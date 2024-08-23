import { Blog, Comment, Pet, Prisma, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IPaginationOptions, IUser } from "../../interfaces";
import { commentSearchAbleFields } from "./comment.constant";

const createCommentIntoDB = async (
  userData: IUser,
  commentData: any
): Promise<Comment> => {
  const { blogId, userId } = commentData;

  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
      status: UserStatus.ACTIVE,
    },
  });

  await prisma.blog.findUniqueOrThrow({
    where: {
      id: blogId,
    },
  });

  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const result = await prisma.comment.create({
    data: commentData,
  });

  return result;
};

const getAllCommentsFromDB = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.CommentWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: commentSearchAbleFields.map((field) => ({
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
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.CommentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // console.dir(whereConditions, { depth: Infinity });

  const result = await prisma.comment.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
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

  const total = await prisma.comment.count({
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
};

const getMyCommentsFromDB = async (
  params: any,
  options: IPaginationOptions,
  userData: IUser
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.CommentWhereInput[] = [];

  if (userData?.role) {
    andConditions.push({
      author: {
        id: userData.userId,
      },
    });
  }

  if (params.searchTerm) {
    andConditions.push({
      OR: commentSearchAbleFields.map((field) => ({
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
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.CommentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // console.dir(whereConditions, {depth: Infinity});

  const result = await prisma.comment.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
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

  const total = await prisma.comment.count({
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
};

const getACommentIntoDB = async (commentId: string, userData: IUser) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
      status: UserStatus.ACTIVE,
    },
  });

  await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
  });

  const result = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
    include: {
      author: true,
      blog: true,
    },
  });

  return result;
};

const updateCommentIntoDB = async (
  userData: IUser,
  commentId: string,
  data: Partial<Comment>
): Promise<Comment> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
      status: UserStatus.ACTIVE,
    },
  });

  await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
  });

  const result = await prisma.comment.update({
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
};

const deleteCommentIntoDB = async (
  userData: IUser,
  commentId: string
): Promise<Comment> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
      status: UserStatus.ACTIVE,
    },
  });

  await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
  });

  const result = await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  return result;
};

export const CommentService = {
  createCommentIntoDB,
  getAllCommentsFromDB,
  getMyCommentsFromDB,
  getACommentIntoDB,
  updateCommentIntoDB,
  deleteCommentIntoDB,
};
