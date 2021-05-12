import { DefaultState, DefaultContext, ParameterizedContext } from "koa";
import * as bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import * as jwt from "jsonwebtoken";

require("dotenv").config();

class AuthRoutes {
  userData: Array<{ name: string; password: string }>;
  constructor(user: Array<{ name: string; password: string }>) {
    this.userData = user;
  }

  authenticateToken = async (
    ctx: ParameterizedContext<DefaultState, DefaultContext>,
    next: any
  ) => {
    const authHeader = ctx.request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    // ctx.body = ctx.request.headers;
    if (token === null) ctx.status = 401;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        ctx.status = 403;
        ctx.body = { name: ctx.request.body.name, isLoggedIn: false };
      }
      // ctx.request.body = user;
      ctx.request.body = { ...ctx.request.body, isLoggedIn: true };
      console.log(user);
    });
    await next();
  };
  login = async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
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
      passwordMatch = await bcrypt.compare(
        ctx.request.body.password,
        user.password
      );
    } catch {
      ctx.status = 500;
    }
    console.log(passwordMatch);
    if (passwordMatch) {
      ctx.body = { name: user.name, isLoggedIn: true };
    } else {
      ctx.status = 500;
      ctx.body = { message: "Invalid Username or password", isLoggedIn: false };
    }
  };
}
export default AuthRoutes;
