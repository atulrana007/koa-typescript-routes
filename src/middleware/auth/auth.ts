import * as bcrypt from "bcrypt";
import { addedUserData } from "../../routes/addUsers/addUser";

import { WebToken } from "../../utils/webToken/wenToken";
import { Encryption } from "../../utils/encrypt/encryption";
import { IEncryption, IWebToken, AppMiddleWareContext } from "../../interface";

require("dotenv").config();

export class Authentication {
  private static instance: Authentication | undefined = undefined;

  public static getInstance(
    user: Array<{ name: string; password: string }>,
    jwt: IWebToken,
    bcrypt: IEncryption
  ) {
    if (this.instance !== undefined) return this.instance;
    this.instance = new Authentication(user, jwt, bcrypt);
    return this.instance;
  }

  private userData: Array<{ name: string; password: string }>;
  constructor(
    user: Array<{ name: string; password: string }>,
    private readonly jsonToken: IWebToken,
    private readonly bcrypt: IEncryption
  ) {
    this.userData = user;
  }

  authenticateToken = async (ctx: AppMiddleWareContext, next: any) => {
    if (ctx.path === "/login") {
      const authHeader = ctx.request.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token === null) ctx.status = 401;
      try {
        const verify = this.jsonToken.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET
        );
        ctx.request.body = { ...ctx.request.body, isLoggedIn: true };
        await next();
      } catch (err) {
        ctx.status = 403;
        ctx.body = {
          data: { name: ctx.request.body.name, isLoggedIn: false },
          error: err,
        };
      }
    } else {
      await next();
    }
  };
  login = async (ctx: AppMiddleWareContext, next: any) => {
    if (ctx.path === "/login") {
      const checkUser = this.userData.findIndex((item) => {
        return item.name === ctx.request.body.name;
      });
      if (checkUser === -1) {
        ctx.status = 400;
        ctx.body = { message: "User not found" };
      }
      const user: { name: string; password: string } = this.userData[checkUser];
      let passwordMatch: boolean;
      try {
        passwordMatch = await this.bcrypt.compare(
          ctx.request.body.password,
          user.password
        );
      } catch {
        ctx.status = 500;
      }

      if (passwordMatch) {
        ctx.body = { name: user.name, isLoggedIn: true };
      } else {
        ctx.status = 500;
        ctx.body = {
          message: "Invalid Username or password",
          isLoggedIn: false,
        };
      }
    }
    await next();
  };
  logout = async (ctx: AppMiddleWareContext, next: any) => {
    if (ctx.path === "/logout") {
      const authHeader = ctx.request.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      console.log("I am token", token);
      console.log("I am access secret token", process.env.ACCESS_TOKEN_SECRET);

      if (token === null) ctx.status = 401;
      try {
        const verify = this.jsonToken.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET
        );
        await next();
      } catch (err) {
        ctx.body = {
          error: err,
        };
      }
    } else {
      await next();
    }
  };
}

const authInstance = Authentication.getInstance(
  addedUserData,
  WebToken.getInstance(),
  Encryption.getInstance()
);

export default authInstance;
