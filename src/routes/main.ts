import { DefaultState, DefaultContext, ParameterizedContext } from "koa";
import * as Router from "koa-router";

type methods = "GET" | "POST";

function routerHandler(route: Function) {
  return async (
    ctx: ParameterizedContext<DefaultState, DefaultContext>,
    next: () => Promise<any>
  ) => {
    try {
      await next();
      const response = await route(ctx);
      ctx.status = 200;
      ctx.body = response;
    } catch (err) {
      const response = await route(ctx);
      ctx.body = response;
    }
  };
}
export default routerHandler;
function routeRegistry(
  routes: { url: string; methods: methods[]; route: Function }[],
  router: Router<any, {}>
) {
  for (let item of routes) {
    const { url, methods, route } = item;
    router.register(url, methods, routerHandler(route));
  }
}
export { routerHandler, routeRegistry };
