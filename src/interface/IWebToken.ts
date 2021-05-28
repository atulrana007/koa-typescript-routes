import { user } from "../types/responses/addUserResponse";

export interface IWebToken {
  sign: (user: user, accessToken: string) => string;
  verify: (token: string, accessToken: string) => {};
}
