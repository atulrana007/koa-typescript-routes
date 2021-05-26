import { DefaultState, DefaultContext, ParameterizedContext } from "koa";
import * as Router from "koa-router";
import { KoaContext, methods } from "../../types/types";
import "colors";

export class SimpleRoute {
  public static instance: SimpleRoute | undefined = undefined;

  public static getInstance() {
    if (this.instance !== undefined) return this.instance;
    this.instance = new SimpleRoute();
    return this.instance;
  }
  constructor() {}

  home() {
    return { msg: "Task 0" };
  }
  hello() {
    return {
      msg: "world",
    };
  }
  echo(ctx: KoaContext) {
    return ctx.query;
  }
  error() {
    return { message: "Internal server error" };
  }
}

const simpleRoutes = SimpleRoute.getInstance();

const routes: { url: string; methods: methods[]; route: Function }[] = [
  {
    url: "/task0",
    methods: ["GET"],
    route: simpleRoutes.home,
  },
  {
    url: "/hello",
    methods: ["GET"],
    route: simpleRoutes.hello,
  },
  {
    url: "/echo",
    methods: ["GET"],
    route: simpleRoutes.echo,
  },
  {
    url: "/error",
    methods: ["GET"],
    route: simpleRoutes.error,
  },
];

export default routes;
