import { DefaultState, DefaultContext, ParameterizedContext } from "koa";
import * as bcrypt from "bcrypt";

export default function authRoutes(
  userData: Array<{ name: string; password: string }>
) {
  return async function login(
    ctx: ParameterizedContext<DefaultState, DefaultContext>,
    next: any
  ) {
    const checkUser = userData.findIndex((item) => {
      return item.name === ctx.request.body.name;
    });
    let user: { name: string; password: string };
    if (checkUser === -1) {
      ctx.status = 400;
      ctx.body = { message: "User not found" };
    } else {
      user = userData[checkUser];
    }
    try {
      if (await bcrypt.compare(ctx.request.body.password, user.password)) {
        ctx.body = { text: "success" };
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
