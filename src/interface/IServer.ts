import { Response, errorResponse } from "../types";
import { AppKoaRouterContext } from "./app";

export interface IServer {
  get: (url: string) => Promise<any>;
  post: (url: string) => any;
  put: (url: string) => Promise<any>;
  delete: (url: string) => Promise<any>;
}
