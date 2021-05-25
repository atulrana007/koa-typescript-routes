import * as Router from "koa-router";
import addUserRoutes from "./addUsers/addUser";
import taskOneRoutes from "./Todo/Todo";
import taskZeroRoutes from "./simpleRoutes/simpleRoutes";
import factorialRoutes from "./factorial/factorial";
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

export default finalRouter;
