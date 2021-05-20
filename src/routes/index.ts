import * as Router from "koa-router";
import authRoutes from "./auth";
import addUserRoutes from "./addUser";
import logoutRoutes from "./logout";
import taskOneRoutes from "./task_one_todo";
import taskZeroRoutes from "./task_zero_simple_routes";
import factorialRoutes from "./factorial";

const FinalRouter: Array<Router> = [
  authRoutes,
  addUserRoutes,
  logoutRoutes,
  taskOneRoutes,
  taskZeroRoutes,
  factorialRoutes,
];

export default FinalRouter;
