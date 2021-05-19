import { DefaultState, DefaultContext, ParameterizedContext } from "koa";
interface IMiddleWare {
  middleWare(
    ctx: ParameterizedContext<DefaultState, DefaultContext>,
    next: any
  ): void;
}
export default IMiddleWare;
