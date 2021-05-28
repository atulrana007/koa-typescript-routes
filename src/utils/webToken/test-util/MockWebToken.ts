import * as jwt from "jsonwebtoken";
import { IWebToken } from "../../../interface/IWebToken";
import { user } from "../../../types/responses/addUserResponse";

export class MockWebToken implements IWebToken {
  private response: string;
  constructor() {}

  setResponse = (message: any) => {
    this.response = message;
  };

  sign = (user: user, accessToken: string): string => {
    return this.response;
  };
  verify = async (token: string, accessToken: string) => {
    return this.response;
  };
}
