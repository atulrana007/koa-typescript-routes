import * as Router from "koa-router";
import AddUser from "../controllers/addUser";
import * as fs from "fs";
import * as path from "path";
import { DefaultState, DefaultContext, ParameterizedContext } from "koa";

const router: Router = new Router();
<<<<<<< HEAD
const add = new AddUser();
=======
const add = new addUser();
>>>>>>> d387ea0... authentication with webtokens

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
