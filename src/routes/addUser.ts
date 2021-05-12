import * as Router from "koa-router";
import addUser from "../controllers/addUser";
import * as fs from "fs";
import * as path from "path";
import { DefaultState, DefaultContext, ParameterizedContext } from "koa";

const router: Router = new Router();
const add = new addUser();

router.get(
  "/users",
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    ctx.body = add.userData;
  }
);
router.post("/users", add.addUsers);

const addedUserData: Array<{ name: string; password: string }> = add.userData;

export default router;
export { addedUserData };
