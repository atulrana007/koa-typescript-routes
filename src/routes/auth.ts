import * as Router from "koa-router";
import auth from "../controllers/auth";
import * as fs from "fs";
import * as path from "path";
import { DefaultState, DefaultContext, ParameterizedContext } from "koa";

const data = fs.readFileSync(
  path.join(__dirname, "../data-access/usersData.json")
);
const userData = JSON.parse(data.toString());

const router: Router = new Router();
const authRoutes = auth(userData);

router.post("/users/login", authRoutes);

export default router;
