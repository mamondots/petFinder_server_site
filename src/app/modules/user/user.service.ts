import { Prisma, User, UserRole, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { userSearchAbleFields } from "./user.constant";
import {
  IPaginationOptions,
  IUser,
  IUserData,
  IUserResponseData,
} from "../../interfaces";
import { paginationHelper } from "../../../helpers/paginationHelper";

const createUser = async (user: IUserData): Promise<IUserResponseData> => {
  const hashedPassword: string = await bcrypt.hash(user.password, 12);

  const userData = {
    name: user.name,
    email: user.email,
    password: hashedPassword,
    role: UserRole.USER,
    contactNumber: user.contactNumber,
    address: user.address,
  };

  const result: User = await prisma.user.create({
    data: userData,
  });
  const { password: _, ...userDataWithoutPassword } = result;

  return userDataWithoutPassword;
};

const getAllFromDB = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.UserWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: userSearchAbleFields.map((field) => ({
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

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
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

  const total = await prisma.user.count({
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

const getMyProfileFromDB = async (
  userData: IUser
): Promise<IUserResponseData | null> => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
      status: UserStatus.ACTIVE,
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
};

const updateProfileIntoDB = async (
  userData: IUser,
  data: Partial<User>
): Promise<IUserResponseData> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
      status: UserStatus.ACTIVE,
    },
  });

  const result = await prisma.user.update({
    where: {
      id: userData?.userId,
      isDeleted: false,
      status: UserStatus.ACTIVE,
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
};

const changeUserRole = async (id: string, role: UserRole) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
      status: UserStatus.ACTIVE,
    },
  });

  const updateUserRole = await prisma.user.update({
    where: {
      id,
      isDeleted: false,
      status: UserStatus.ACTIVE,
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
};

const changeUserStatus = async (id: string, status: UserStatus) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const updateUserStatus = await prisma.user.update({
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
};

const softDelete = async (id: string): Promise<User | null> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const userSoftDelete = await prisma.user.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
      status: UserStatus.DELETED,
    },
  });

  return userSoftDelete;
};

export const userService = {
  createUser,
  getAllFromDB,
  getMyProfileFromDB,
  updateProfileIntoDB,
  changeUserRole,
  changeUserStatus,
  softDelete,
};
