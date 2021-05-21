import { DefaultState, DefaultContext, ParameterizedContext } from "koa";
import { Response, errorResponse } from "../types/types";
interface IFactorialRoute {
  factorial(
    ctx: ParameterizedContext<DefaultState, DefaultContext>
  ): Promise<Response | errorResponse>;
}
export default IFactorialRoute;
