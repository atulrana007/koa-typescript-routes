import { DefaultState, DefaultContext, ParameterizedContext } from "koa";
import * as Router from "koa-router";
import { KoaContext, methods } from "../../types/types";
import "colors";
import { AppContext } from "../../interface/app";

export class SimpleRoute {
  public static instance: SimpleRoute | undefined = undefined;

  public static getInstance() {
    if (this.instance !== undefined) return this.instance;
    this.instance = new SimpleRoute();
    return this.instance;
  }
  constructor() {}

  home() {
    return { message: "Task 0" };
  }
  hello() {
    return {
      message: "world",
    };
  }
  echo(ctx: AppContext) {
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
