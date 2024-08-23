import { Blog, BlogStatus, Pet, Prisma, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IPaginationOptions, IUser } from "../../interfaces";
import { blogSearchAbleFields } from "./blog.constant";

const createBlogIntoDB = async (
  userData: IUser,
  blogData: any
): Promise<Blog> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId
    },
  });

  const result = await prisma.blog.create({
    data: blogData,
  });

  return result;
};

const publishedBlogIntoDB = async (
  userData: IUser,
  blogId: string
): Promise<Blog> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
      status: UserStatus.ACTIVE,
    },
  });

  const result = await prisma.blog.update({
    where: {
      id: blogId,
    },
    data: {
      status: BlogStatus.PUBLISHED,
    },
  });

  return result;
};

const getAllBlogsFromDB = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.BlogWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: blogSearchAbleFields.map((field) => ({
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

  const whereConditions: Prisma.BlogWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // console.dir(whereConditions, { depth: Infinity });

  const result = await prisma.blog.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
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

  const total = await prisma.blog.count({
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

const getMyBlogsFromDB = async (
  params: any,
  options: IPaginationOptions,
  userData: IUser
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.BlogWhereInput[] = [];

  if (userData?.role) {
    andConditions.push({
      author: {
        id: userData.userId,
      },
    });
  }

  if (params.searchTerm) {
    andConditions.push({
      OR: blogSearchAbleFields.map((field) => ({
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

  const whereConditions: Prisma.BlogWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // console.dir(whereConditions, {depth: Infinity});

  const result = await prisma.blog.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
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

  const total = await prisma.blog.count({
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

const getABlogIntoDB = async (blogId: string, userData: IUser) => {
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

  const result = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
    include: {
      author: true,
      comment: true,
    },
  });

  return result;
};

const updateBlogIntoDB = async (
  userData: IUser,
  blogId: string,
  data: Partial<Blog>
): Promise<Blog> => {
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

  const result = await prisma.blog.update({
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
};

const deleteBlogIntoDB = async (
  userData: IUser,
  blogId: string
): Promise<Blog> => {
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

  return await prisma.$transaction(async (transactionClient) => {
    const deleteBlog = await prisma.blog.delete({
      where: {
        id: blogId,
      },
    });

    //* delete blog comment
    await transactionClient.comment.deleteMany({
      where: {
        blogId: blogId,
      },
    });
    return deleteBlog;
  });
};

export const BlogService = {
  createBlogIntoDB,
  publishedBlogIntoDB,
  getAllBlogsFromDB,
  getMyBlogsFromDB,
  getABlogIntoDB,
  updateBlogIntoDB,
  deleteBlogIntoDB,
};
