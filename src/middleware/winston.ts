import * as winstonLog from "winston";
import { AppMiddleWareContext } from "../interface/app";
import { Levels } from "../types";
import { ILoggerMessage } from "../interface/ILogger";
import { IWinstonLogger } from "../interface/IWinstonLogger";

export class WinstonLogger implements IWinstonLogger {
  public logger: winstonLog.Logger;

  public static instance: WinstonLogger | undefined = undefined;
  public static getInstance(): WinstonLogger {
    if (this.instance !== undefined) return this.instance;
    this.instance = new WinstonLogger(winstonLog);
    return this.instance;
  }

  constructor(parameter: typeof winstonLog) {
    this.logger = parameter.createLogger({
      format: parameter.format.json(),
      transports: [
        new parameter.transports.File({
          filename: "info.txt",
          dirname: "log",
        }),
        new parameter.transports.Console(),
      ],
    });
  }

  log = (message: ILoggerMessage) => {
    const { level, ...rest } = message;
    this.logger.log(level, "", rest);
  };
}

export const createWinstonLogger = () => WinstonLogger.getInstance();

const inBoundRequestLogger = async (
  ctx: AppMiddleWareContext,
  next: () => Promise<any>
) => {
  try {
    await next();

    createWinstonLogger().log({
      level: Levels.Info,
      routeName: ctx.url,
      message: ctx.message,
      method: ctx.method,
    });
  } catch (err) {
    createWinstonLogger().log({
      level: Levels.Error,
      routeName: ctx.url,
      message: err?.body?.message || err?.body?.error?.message,
      method: ctx.method,
    });
    ctx.throw(err);
  }
};

export default inBoundRequestLogger;
