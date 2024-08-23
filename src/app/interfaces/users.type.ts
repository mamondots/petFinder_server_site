import { Gender, UserRole, UserStatus } from "@prisma/client";

export type IUserResponseData = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePhoto?: string | null;
  contactNumber: string;
  address: string;
  gender?: Gender | null;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type IUserData = {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  address: string;
};

export type IUser = {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
};
