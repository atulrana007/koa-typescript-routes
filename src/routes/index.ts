import * as Router from "koa-router";
import authRoutes from "./auth";
import addUserRoutes from "./addUser";
import logoutRoutes from "./logout";
import taskOneRoutes from "./task_one_todo";
import taskZeroRoutes from "./task_zero_simple_routes";
import factorialRoutes from "../controllers/factorial";
import { routeRegistry } from "./main";

const factorialRouter: Router = new Router();
routeRegistry(factorialRoutes, factorialRouter);

const FinalRouter: Array<Router> = [
  authRoutes,
  addUserRoutes,
  logoutRoutes,
  taskOneRoutes,
  taskZeroRoutes,
  factorialRouter,
];

export default FinalRouter;
