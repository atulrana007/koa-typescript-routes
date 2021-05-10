import * as Router from "koa-router";
import addUser from "../controllers/addUser";
import * as fs from "fs";
import * as path from "path";
import { DefaultState, DefaultContext, ParameterizedContext } from "koa";

const data = fs.readFileSync(
  path.join(__dirname, "../data-access/usersData.json")
);
const userData = JSON.parse(data.toString());

const router: Router = new Router();
const add = addUser(userData);

router.get(
  "/users",
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    ctx.body = userData;
  }
);
router.post("/users", add);

export default router;
