import { Request as ExpressRequest } from "express";
import { IUser } from "./users.type";

export interface RequestWithUser extends ExpressRequest {
  user: IUser;
}