import * as Router from "koa-router";
import AuthRoutes from "../controllers/auth";
import * as fs from "fs";
import * as path from "path";
import { DefaultState, DefaultContext, ParameterizedContext } from "koa";
import { addedUserData } from "../controllers/addUser";

const router: Router = new Router();
const authRoutes = new AuthRoutes(addedUserData);

router.post("/login", authRoutes.authenticateToken, authRoutes.login);

router.post(
  "/auth",
  authRoutes.authenticateToken,
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    ctx.body = ctx.request.body ? ctx.request.body : "Access Token expired";
  }
);
export default router;
