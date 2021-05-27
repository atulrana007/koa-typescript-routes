import { DefaultState, DefaultContext, ParameterizedContext } from "koa";
import * as Router from "koa-router";
import { AppContext, AppKoaRouterContext, Response } from "../types";
import { createKoaRouterToAppContextTransform } from "../utils/KoaRouterToAppContext/KoaRouterToAppContext";

type methods = "GET" | "POST";

type Route<T> = (ctx: AppContext) => Promise<Response<T>>;

function routerHandler<T>(route: Route<T>) {
  return async (ctx: AppKoaRouterContext, next: () => Promise<any>) => {
    try {
      await next();
      const _ctx = createKoaRouterToAppContextTransform().transform(ctx);
      const response = await route(_ctx);
      console.log("Response", response);
      switch (ctx.path) {
        case "/error":
          ctx.status = 500;
          ctx.throw(response);

        case "/users":
          ctx.status = response.status;
          if (ctx.status !== 200) {
            ctx.throw(response);
          }
          ctx.body = response;

        default:
          ctx.status = 200;
          ctx.body = response;
      }
    } catch (err) {}
  };
}
export default routerHandler;
function routeRegistry(
  routes: { url: string; methods: methods[]; route: Route<{}> }[],
  router: Router<any, {}>
) {
  for (let item of routes) {
    const { url, methods, route } = item;
    router.register(url, methods, routerHandler(route));
  }
}
export { routerHandler, routeRegistry };
