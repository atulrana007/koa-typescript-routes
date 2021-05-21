import { DefaultContext, DefaultState, ParameterizedContext } from "koa";

export type KoaContext = ParameterizedContext<DefaultState, DefaultContext>;
export type methods = "GET" | "POST" | "DELETE" | "PUT";
export type Response = {
  data: {
    factorial: {
      value: number;
      timeTaken: number; // time in millisecond
    };
  };
};
export type errorResponse = {
  error: {
    reason: string;
    dateTime: Date;
    message: string;
    details?: {
      [key: string]: any;
    };
  };
};
