import * as Koa from "koa";
import { DefaultState, DefaultContext, ParameterizedContext } from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import * as dotenv from "dotenv";
import * as path from "path";
import * as bcrypt from "bcrypt";

dotenv.config({ path: __dirname + "/.env" });

const port = process.env.PORT || 5000;

const app: Koa<DefaultState, DefaultContext> = new Koa();
const router: Router = new Router();

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

const users: Array<{ name: string; password: string }> = [];
router.get(
  "/users",
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    ctx.body = users;
  }
);
const addUsers = async (
  ctx: ParameterizedContext<DefaultState, DefaultContext>
) => {
  try {
    const checkUser = users.findIndex((item) => {
      return item.name === ctx.request.body.name;
    });

    if (checkUser === -1) {
      const hashedPassword = await bcrypt.hash(ctx.request.body.password, 10);
      const user = {
        name: ctx.request.body.name,
        password: hashedPassword,
      };
      users.push(user);
      ctx.body = users;
    } else {
      ctx.status = 500;
      ctx.body = { message: "user already exits" };
    }
  } catch {
    ctx.status = 500;
    ctx.body = "Internal Server Error";
  }
};
router.post("/users", addUsers);

const login = async (
  ctx: ParameterizedContext<DefaultState, DefaultContext>,
  next: any
) => {
  const checkUser = users.findIndex((item) => {
    return item.name === ctx.request.body.name;
  });
  let user: { name: string; password: string };
  if (checkUser === -1) {
    ctx.status = 400;
  } else {
    user = users[checkUser];
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

router.post(
  "/users/login",
  login,
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    console.log("User Page");
  }
);

const server = app.listen(port).on("listening", () => {
  console.log(`Listening at Port ${port}...`);
});

export default server;
