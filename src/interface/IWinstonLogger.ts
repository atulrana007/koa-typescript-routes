import { ILoggerMessage } from "./ILogger";

export interface IWinstonLogger {
  log(LogMessage: ILoggerMessage): void;
}
