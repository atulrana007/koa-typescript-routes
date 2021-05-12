import { DefaultState, DefaultContext, ParameterizedContext } from "koa";
import * as bcrypt from "bcrypt";
import * as fs from "fs";
import * as path from "path";
import * as jwt from "jsonwebtoken";

class AddUser {
  userData: Array<{ name: string; password: string }>;
  constructor() {
    this.userData = [];
  }
  generateAccessToken = (user: { name: string; password: string }) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "5m",
    });
  };
  addUsers = async (
    ctx: ParameterizedContext<DefaultState, DefaultContext>,
    next: any
  ) => {
    try {
      const checkUser =
        this.userData !== [] &&
        this.userData.findIndex((item) => {
          return item.name === ctx.request.body.name;
        });

      if (checkUser === -1) {
        const hashedPassword = await bcrypt.hash(ctx.request.body.password, 10);
        const user = {
          name: ctx.request.body.name,
          password: hashedPassword,
        };
        this.userData.push(user);
        const accessToken = this.generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        ctx.response.body = { auth: true, token: accessToken };
      } else {
        ctx.status = 500;
        ctx.body = { message: "user already exits" };
      }
    } catch {
      console.log("Directed to catch");
      ctx.status = 500;
      ctx.body = "Internal Server Error";
    }
    next();
  };
}

export default AddUser;
