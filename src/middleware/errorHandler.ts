import { AppMiddleWareContext } from "../interface/app";

class ErrorHandler {
  private static instance: ErrorHandler | undefined = undefined;

  public static getInstance() {
    if (this.instance !== undefined) return this.instance;
    this.instance = new ErrorHandler();
    return this.instance;
  }
  constructor() {}
  error(
    ctx: AppMiddleWareContext,
    next: any,
    message: string,
    statusCode: number
  ) {
    ctx.type = "json";
    ctx.status = statusCode || 500;
    ctx.body = {
      status: "error",
      message,
    };
  }
}

export const errorHandlerInstance = () => ErrorHandler.getInstance();
