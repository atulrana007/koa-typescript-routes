import * as Koa from "koa";
import { DefaultState, DefaultContext, ParameterizedContext } from "koa";
import * as Router from "koa-router";
import * as dotenv from "dotenv";
import "colors";

dotenv.config({ path: __dirname + "/.env" });

const port = process.env.PORT || 5000;

const app: Koa<DefaultState, DefaultContext> = new Koa();
const router: Router = new Router();

router.get(
  "/",
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    ctx.body = { msg: "Task 1" };
  }
);
router.get(
  "/hello",
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    ctx.body = "<h1>world<h1>";
  }
);
router.get(
  "/echo",
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    ctx.body = ctx.query;
  }
);
router.get(
  "/error",
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    ctx.status = 500;
    ctx.body = "Internal Server Error";
  }
);

app.use(router.routes()).use(router.allowedMethods());

app.listen(port).on("listening", () => {
  console.log(`Listening at port ${port}...`);
});
