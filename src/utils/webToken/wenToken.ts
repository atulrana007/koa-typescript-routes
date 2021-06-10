import * as jwt from "jsonwebtoken";
import { IWebToken } from "../../interface/IWebToken";
import { user } from "../../types/responses/addUserResponse";

export class WebToken implements IWebToken {
  private static instance: WebToken | undefined = undefined;

  public static getInstance() {
    if (this.instance !== undefined) return this.instance;
    this.instance = new WebToken();
    return this.instance;
  }
  constructor() {}
  sign = (user: user, accessToken: string): string => {
    return jwt.sign(user, accessToken, {
      expiresIn: "30m",
    });
  };
  verify = (token: string, accessToken: string) => {
    return jwt.verify(token, accessToken);
  };
}
