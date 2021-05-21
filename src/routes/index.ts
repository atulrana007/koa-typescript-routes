import * as Router from "koa-router";
import authRoutes from "./auth";
import addUserRoutes from "./addUser";
import logoutRoutes from "./logout";
import taskOneRoutes from "../controllers/TodoApp";
import taskZeroRoutes from "../controllers/simpleRoutes";
import factorialRoutes from "../controllers/factorial";
import { routeRegistry } from "./main";

const finalRouter: Router = new Router();
const FinalRoutes: Array<any> = [
  taskZeroRoutes,
  taskOneRoutes,
  factorialRoutes,
];
FinalRoutes.map((item) => {
  routeRegistry(item, finalRouter);
});

const FinalRouter: Array<Router> = [
  authRoutes,
  addUserRoutes,
  logoutRoutes,
  finalRouter,
];

export default FinalRouter;
