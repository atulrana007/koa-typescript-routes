import { AppContext } from "../interface/app";
import { Response, errorResponse } from "../types/types";
import { factorialResponse } from "../types";

interface IFactorialRoute {
  factorial(
    ctx: AppContext
  ): Promise<Response<factorialResponse> | errorResponse>;
}
export default IFactorialRoute;
