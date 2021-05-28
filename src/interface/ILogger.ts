import { Levels } from "../types";
export interface ILoggerMessage {
  routeName: string;
  message: string;
  level: Levels;
  method: string;
}
