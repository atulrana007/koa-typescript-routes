import { RouterContext } from "koa-router";
import {
  AppKoaRouterContext,
  RouterContextToAppContextTransformer,
  AppState,
} from "../../interface/app";

export class KoaRouterContextToAppContext
  implements RouterContextToAppContextTransformer
{
  private static instance: KoaRouterContextToAppContext | undefined = undefined;

  public static getInstance() {
    if (this.instance !== undefined) return this.instance;
    this.instance = new KoaRouterContextToAppContext();
    return this.instance;
  }
  constructor() {}

  transform(ctx: AppKoaRouterContext) {
    const resp = {
      params: ctx.params,
      query: ctx.query,
      body: ctx.request.body,
      headers: ctx.headers,
      state: ctx.state,
      status: ctx.status,
    };
    return resp;
  }
}

export const createKoaRouterToAppContextTransform = () =>
  KoaRouterContextToAppContext.getInstance();
