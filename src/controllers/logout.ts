import { DefaultState, DefaultContext, ParameterizedContext } from "koa";
import * as jwt from "jsonwebtoken";

class Logout {
  logout = async (
    ctx: ParameterizedContext<DefaultState, DefaultContext>,
    next: any
  ) => {
    const authHeader = ctx.request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log("accessToken", token);
    if (token === null) ctx.status = 401;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        ctx.status = 403;
        ctx.body = { message: "Access Token Expired", auth: false };
      }
      ctx.body = { message: "Successfully Logged Out", auth: false };
      console.log(user);
    });
  };
}

export default Logout;
