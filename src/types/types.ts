import { DefaultContext, DefaultState, ParameterizedContext } from "koa";

export type KoaContext = ParameterizedContext<DefaultState, DefaultContext>;
export type routesType = { url: string; methods: methods[]; route: Function }[];
export type methods = "GET" | "POST" | "DELETE" | "PUT";

export enum Levels {
  Debug = "debug",
  Verbose = "notice",
  Info = "info",
  Warn = "warning",
  Error = "error",
}

export type Response<T> = {
  message?: string;
  data?: T;
  status?: number;
};
export type errorResponse = {
  error: {
    reason: string;
    dateTime?: Date;
    message?: string;
    details?: {
      [key: string]: any;
    };
    status?: number;
  };
};
