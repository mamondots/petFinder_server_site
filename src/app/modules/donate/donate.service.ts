import { Donation, Prisma, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IPaginationOptions, IUser } from "../../interfaces";
import { donateSearchAbleFields } from "./donate.constant";

const createDonationIntoDB = async (
  userData: IUser,
  donationData: any
): Promise<Donation> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
      status: UserStatus.ACTIVE,
    },
  });

  const result = await prisma.donation.create({
    data: donationData,
  });

  return result;
};

const getAllDonationsFromDB = async (
  params: any,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.DonationWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: donateSearchAbleFields.map((field) => ({
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

  const whereConditions: Prisma.DonationWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // console.dir(whereConditions, { depth: Infinity });

  const result = await prisma.donation.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            donatedAt: "asc",
          },
    include: {
      user: true,
    },
  });

  const total = await prisma.donation.count({
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

const getUserDonationsFromDB = async (
  params: any,
  options: IPaginationOptions,
  userData: IUser
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.DonationWhereInput[] = [];

  if (userData?.role) {
    andConditions.push({
      user: {
        id: userData.userId,
      },
    });
  }

  if (params.searchTerm) {
    andConditions.push({
      OR: donateSearchAbleFields.map((field) => ({
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

  const whereConditions: Prisma.DonationWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // console.dir(whereConditions, {depth: Infinity});

  const result = await prisma.donation.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            donatedAt: "asc",
          },
    include: {
      user: true
    },
  });

  const total = await prisma.donation.count({
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

const getADonationIntoDB = async (donateId: string, userData: IUser) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
      status: UserStatus.ACTIVE,
    },
  });

  await prisma.donation.findUniqueOrThrow({
    where: {
      id: donateId,
    },
  });

  const result = await prisma.donation.findUnique({
    where: {
      id: donateId,
    },
    include: {
      user: true
    },
  });

  return result;
};

const updateDonationIntoDB = async (
  userData: IUser,
  donateId: string,
  data: Partial<Donation>
): Promise<Donation> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
      status: UserStatus.ACTIVE,
    },
  });

  await prisma.donation.findUniqueOrThrow({
    where: {
      id: donateId,
    },
  });

  const result = await prisma.donation.update({
    where: {
      id: donateId,
    },
    data,
    include: {
      user: true
    },
  });

  return result;
};

const deleteDonationIntoDB = async (
  userData: IUser,
  donateId: string
): Promise<Donation> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
      status: UserStatus.ACTIVE,
    },
  });

  await prisma.donation.findUniqueOrThrow({
    where: {
      id: donateId,
    },
  });

  const result = await prisma.donation.delete({
    where: {
      id: donateId,
    },
  });

  return result;
};

export const DonationService = {
  createDonationIntoDB,
  getAllDonationsFromDB,
  getUserDonationsFromDB,
  getADonationIntoDB,
  updateDonationIntoDB,
  deleteDonationIntoDB,
};
