import * as Koa from "koa";
import { DefaultState, DefaultContext, ParameterizedContext } from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import * as dotenv from "dotenv";
import authRoutes from "./routes/auth";
import addUserRoutes from "./routes/addUser";
import logoutRoutes from "./routes/logout";
import taskOneRoutes from "./routes/task_one_todo";
import taskZeroRoutes from "./routes/task_zero_simple_routes";

dotenv.config({ path: __dirname + "/.env" });

const port = process.env.PORT || 5000;

const app: Koa<DefaultState, DefaultContext> = new Koa();
const router: Router = new Router();

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.use(addUserRoutes.routes()).use(addUserRoutes.allowedMethods());
app.use(authRoutes.routes()).use(authRoutes.allowedMethods());
app.use(logoutRoutes.routes()).use(logoutRoutes.allowedMethods());
app.use(taskOneRoutes.routes()).use(taskOneRoutes.allowedMethods());
app.use(taskZeroRoutes.routes()).use(taskZeroRoutes.allowedMethods());

const server = app.listen(port).on("listening", () => {
  console.log(`Listening at Port ${port}...`);
});

export default server;
