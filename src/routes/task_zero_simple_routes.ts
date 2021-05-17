import { DefaultState, DefaultContext, ParameterizedContext } from "koa";
import * as Router from "koa-router";
import "colors";

const router: Router = new Router();

router.get(
  "/task0",
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    ctx.body = { msg: "Task 0" };
  }
);
router.get(
  "/hello",
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    ctx.body = { msg: "world" };
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

export default router;
