import { DefaultState, DefaultContext, ParameterizedContext } from "koa";
import * as bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import { request } from "node:http";

require("dotenv").config();

class authRoutes {
  userData: Array<{ name: string; password: string }>;
  constructor(user: Array<{ name: string; password: string }>) {
    this.userData = user;
  }
  generateAccessToken = (user: { name: string; password: string }) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "2m",
    });
  };
  login = async (
    ctx: ParameterizedContext<DefaultState, DefaultContext>,
    next: any
  ) => {
    const checkUser = this.userData.findIndex((item) => {
      return item.name === ctx.request.body.name;
    });
    if (checkUser === -1) {
      ctx.status = 400;
      ctx.body = { message: "User not found" };
    }
    const user: { name: string; password: string } = this.userData[checkUser];

    try {
      if (await bcrypt.compare(ctx.request.body.password, user.password)) {
        // ctx.body = { text: "success" };
        const accessToken = this.generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        ctx.body = { accessToken: accessToken, refreshToken: refreshToken };
        await next();
      } else {
        ctx.status = 500;
        ctx.body = { message: "Invalid UserName of password" };
      }
    } catch {
      ctx.status = 500;
    }
  };
}
export default authRoutes;
