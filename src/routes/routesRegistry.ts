import * as Router from "koa-router";
import addUserRoutes from "./addUsers/addUser";
import taskOneRoutes from "./Todo/Todo";
import taskZeroRoutes from "./simpleRoutes/simpleRoutes";
import factorialRoutes from "./factorial/factorial";
import { userPostRoutes } from "./jsonPlaceHolder/jsonPlaceHolder";
import { routeRegistry } from "./main";
import { AppKoaRouterContext } from "../interface/app";

const finalRouter: Router<AppKoaRouterContext> = new Router();
const FinalRoutes: Array<any> = [
  taskZeroRoutes,
  taskOneRoutes,
  factorialRoutes,
  addUserRoutes,
  userPostRoutes,
];
FinalRoutes.map((item) => {
  routeRegistry(item, finalRouter);
});

export default finalRouter;
