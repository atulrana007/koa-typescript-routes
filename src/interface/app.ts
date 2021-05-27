import { ParameterizedContext } from "koa";
import { IRouterContext } from "koa-router";

export interface AppState {}

export interface AppMiddleWareContext
  extends ParameterizedContext<AppState, AppContext> {}

export interface AppContext {
  params: any;
  query: any;
  body?: any;
  headers: {
    [key: string]: string | string[];
  };
  state: AppState;
}

export interface AppKoaRouterContext extends IRouterContext {
  state: AppState;
}

export interface RouterContextToAppContextTransformer {
  transform: (ctx: AppKoaRouterContext) => AppContext;
}
