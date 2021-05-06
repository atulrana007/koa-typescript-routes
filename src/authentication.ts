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

const users: Array<{ name: string; password: string }> = [];

router.get(
  "/",
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    ctx.body = "Hello world";
  }
);

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
    const hashedPassword = await bcrypt.hash(ctx.request.body.password, 10);
    const user = {
      name: ctx.request.body.name,
      password: hashedPassword,
    };
    users.push(user);
    ctx.body = users;
  } catch {
    ctx.status = 500;
    ctx.body = "Internal Server Error";
  }
};
router.post("/users", addUsers);

const login = async (
  ctx: ParameterizedContext<DefaultState, DefaultContext>
) => {
  const user = users.find((user) => (user.name = ctx.request.body.name));

  user === null ? (ctx.status = 400) : null;
  try {
    ctx.body = (await bcrypt.compare(ctx.request.body.password, user.password))
      ? { text: "success" }
      : { text: "invalid UserName or password" };
  } catch {
    ctx.status = 500;
  }
};

router.post("/users/login", login);

app.use(router.routes()).use(router.allowedMethods());

const server = app.listen(port).on("listening", () => {
  console.log(`Listening at Port ${port}...`);
});

export default server;
