import IFactorial from "../interface/IFactorial";
import IFactorialTechnique from "../interface/IFactorialTechnique";
import IFactorialMiddleWare from "../interface/IMiddleWare";
import { Response, errorResponse } from "../types/factorialTypes";
import { DefaultState, DefaultContext, ParameterizedContext } from "koa";
import { performance } from "perf_hooks";

const MemoizedFactorialArray: Array<number> = [1];
class LinearFactorial implements IFactorial {
  factorial = (num: number): number => {
    let ans: number = 1;
    const modulo = 1000000007;
    for (let i = 1; i <= num; i++) {
      ans = (ans * i) % modulo;
    }
    return ans;
  };
}
class RecursiveFactorial implements IFactorial {
  factorial = (num: number) => {
    if (num == 1) return 1;
    return (num * this.factorial(num - 1)) % 1000000007;
  };
}
class MemoizedFactorial implements IFactorial {
  _factorial(num: number) {
    let result = MemoizedFactorialArray[MemoizedFactorialArray.length - 1];
    for (let val = MemoizedFactorialArray.length; val <= num; val++) {
      result = (result * val) % 1000000007;
      MemoizedFactorialArray.push(result);
    }
  }
  factorial = (num: number) => {
    if (num <= MemoizedFactorialArray.length - 1) {
      return MemoizedFactorialArray[num];
    } else {
      this._factorial(num);
      return MemoizedFactorialArray[num];
    }
  };
}

class FactorialGetter implements IFactorialTechnique {
  constructor(private readonly factorialClassInstance: IFactorial) {}

  getFactorial(num: number): { value: number; time: number } {
    const start = performance.now();
    const value: number = this.factorialClassInstance.factorial(num);
    const end = performance.now();
    const diff = end - start;
    return { value: value, time: diff };
  }
}

class FactorialMiddleWare implements IFactorialMiddleWare {
  middleWare = async (
    ctx: ParameterizedContext<DefaultState, DefaultContext>,
    next: any
  ) => {
    const num: number = ctx.params.number;
    const query: any = ctx.query!! ? ctx.query.query : null;
    let obj: any;
    let finalResponse: Response;
    let responseError: errorResponse;

    if (num >= 1 && num <= 100000000) {
      if (query === "fast" || query === "slow") {
        obj =
          query === "fast"
            ? new FactorialGetter(new MemoizedFactorial())
            : new FactorialGetter(new RecursiveFactorial());
      } else {
        obj = new FactorialGetter(new LinearFactorial());
      }
      try {
        const output = obj.getFactorial(num);
        finalResponse = {
          data: { factorial: { value: output.value, timeTaken: output.time } },
        };
        ctx.response.body = finalResponse;
      } catch (err) {
        responseError = {
          error: {
            reason: err.name,
            dateTime: new Date(),
            message: err.message,
            details: {
              ["number"]: num,
            },
          },
        };
        ctx.response.body = responseError;
      }
    } else {
      responseError = {
        error: {
          reason: "Invalid Input",
          dateTime: new Date(),
          message: "Number should be in range 1 to 10^8",
          details: {
            ["number"]: num,
          },
        },
      };
      ctx.response.body = responseError;
    }
  };
}

export default FactorialMiddleWare;
