import { AppContext } from "./app";
import { Response } from "../types";
import { addUserResponse, user } from "../types/responses/addUserResponse";

export interface IAddUser {
  generateAccessToken: (user: user) => string;
  addUsers: (ctx: AppContext, next: any) => Promise<Response<addUserResponse>>;
}
