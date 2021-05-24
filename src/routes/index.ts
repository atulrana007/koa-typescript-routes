import * as Router from "koa-router";
import authRoutes from "./auth";
import addUserRoutes from "../controllers/addUser";
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
  addUserRoutes,
];
FinalRoutes.map((item) => {
  routeRegistry(item, finalRouter);
});

const FinalRouterToUse: Array<Router> = [authRoutes, logoutRoutes, finalRouter];

export default FinalRouterToUse;
