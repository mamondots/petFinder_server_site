import { Pet, Prisma, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IPaginationOptions, IUser } from "../../interfaces";
import { petSearchAbleFields } from "./pet.constant";

const createPetIntoDB = async (userData: IUser, petData: any): Promise<Pet> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
      status: UserStatus.ACTIVE,
    },
  });

  const result = await prisma.pet.create({
    data: petData,
  });

  return result;
};

const getAllPetsFromDB = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.PetWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: petSearchAbleFields.map((field) => ({
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

  const whereConditions: Prisma.PetWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // console.dir(whereConditions, { depth: Infinity });

  const result = await prisma.pet.findMany({
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
      user: true,
      adoptionRequest: true,
    },
  });

  const total = await prisma.pet.count({
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

const getMyPetsFromDB = async (
  params: any,
  options: IPaginationOptions,
  userData: IUser
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.PetWhereInput[] = [];

  if (userData?.role) {
    andConditions.push({
      user: {
        id: userData.userId,
      },
    });
  }

  if (params.searchTerm) {
    andConditions.push({
      OR: petSearchAbleFields.map((field) => ({
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

  const whereConditions: Prisma.PetWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // console.dir(whereConditions, {depth: Infinity});

  const result = await prisma.pet.findMany({
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
      user: true,
      adoptionRequest: true,
    },
  });

  const total = await prisma.pet.count({
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

const getAIntoDB = async (petId: string, userData: IUser) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
      status: UserStatus.ACTIVE,
    },
  });

  await prisma.pet.findUniqueOrThrow({
    where: {
      id: petId,
    },
  });

  const result = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
    include: {
      user: true,
      adoptionRequest: true,
    },
  });

  return result;
};

const updateIntoDB = async (
  userData: IUser,
  petId: string,
  data: Partial<Pet>
): Promise<Pet> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
      status: UserStatus.ACTIVE,
    },
  });
  

  await prisma.pet.findUniqueOrThrow({
    where: {
      id: petId,
    },
  });

  const result = await prisma.pet.update({
    where: {
      id: petId,
    },
    data,
    include: {
      user: true,
    },
  });

  return result;
};

const deleteIntoDB = async (userData: IUser, petId: string): Promise<Pet> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
      status: UserStatus.ACTIVE,
    },
  });

  await prisma.pet.findUniqueOrThrow({
    where: {
      id: petId,
    },
  });

  return await prisma.$transaction(async (transactionClient) => {
    const deletePet = await transactionClient.pet.delete({
      where: {
        id: petId,
      },
    });

    //* delete adoption request
    await transactionClient.adoptionRequest.deleteMany({
      where: {
        petId: petId,
      },
    });
    return deletePet;
  });
};

export const PetService = {
  createPetIntoDB,
  getAllPetsFromDB,
  getMyPetsFromDB,
  getAIntoDB,
  updateIntoDB,
  deleteIntoDB,
};
