import * as bcrypt from "bcrypt";
import { addedUserData } from "../routes/addUsers/addUser";
import * as jwt from "jsonwebtoken";
import { KoaContext } from "../types/types";
import { AppMiddleWareContext } from "../interface/app";

require("dotenv").config();

export class Authentication {
  private static instance: Authentication | undefined = undefined;

  public static getInstance(user: Array<{ name: string; password: string }>) {
    if (this.instance !== undefined) return this.instance;
    this.instance = new Authentication(user);
    return this.instance;
  }

  private userData: Array<{ name: string; password: string }>;
  constructor(user: Array<{ name: string; password: string }>) {
    this.userData = user;
  }

  authenticateToken = async (ctx: AppMiddleWareContext, next: any) => {
    const authHeader = ctx.request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) ctx.status = 401;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        ctx.status = 403;
        ctx.body = { name: ctx.request.body.name, isLoggedIn: false };
      }
      ctx.request.body = { ...ctx.request.body, isLoggedIn: true };
    });
    await next();
  };
  login = async (ctx: KoaContext, next: any) => {
    const checkUser = this.userData.findIndex((item) => {
      return item.name === ctx.request.body.name;
    });
    if (ctx.path === "/login") {
      if (checkUser === -1) {
        ctx.status = 400;
        ctx.body = { message: "User not found" };
      }
      const user: { name: string; password: string } = this.userData[checkUser];
      let passwordMatch: boolean;
      try {
        passwordMatch = await bcrypt.compare(
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
    } else {
      await next();
    }
  };
  logout = async (ctx: AppMiddleWareContext, next: any) => {
    if (ctx.path === "/logout") {
      const authHeader = ctx.request.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      console.log("I am token", token);
      console.log("I am access secret token", process.env.ACCESS_TOKEN_SECRET);

      if (token === null) ctx.status = 401;
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
          console.log("err ------------>", err);
          ctx.status = 403;
          ctx.body = { message: "Access Token Expired", auth: false };
        } else {
          ctx.body = { message: "Successfully Logged Out", auth: false };
        }
      });
    } else {
      await next();
    }
  };
}

const authInstance = Authentication.getInstance(addedUserData);

export default authInstance;
