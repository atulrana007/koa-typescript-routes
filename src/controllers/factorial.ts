import IFactorial from "../interface/IFactorial";
import IFactorialTechnique from "../interface/IFactorialTechnique";
import IFactorialMiddleWare from "../interface/IMiddleWare";
import { DefaultState, DefaultContext, ParameterizedContext } from "koa";
import { performance } from "perf_hooks";

type Response = {
  data: {
    factorial: {
      value: number;
      timeTaken: number; // time in millisecond
    };
  };
};
type errorResponse = {
  error: {
    reason: string;
    dateTime: Date;
    message: string;
    details: {
      [key: string]: any;
    };
  };
};

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
  private cache = {};
  memoize = (fn: any) => {
    return (...args: any[]) => {
      let n = args[0];
      if (n in this.cache) {
        return this.cache[n];
      } else {
        let result = fn(n);
        this.cache[n] = result;
        return result;
      }
    };
  };
  _factorial = this.memoize((num: number) => {
    if (num === 0) {
      return 1;
    } else {
      return (num * this._factorial(num - 1)) % 1000000007;
    }
  });
  factorial = (num: number): number => {
    return this._factorial(num);
  };
}

class FactorialGetter implements IFactorialTechnique {
  constructor(private readonly fact: IFactorial) {}

  getFactorial(num: number): { value: number; time: number } {
    const start = performance.now();
    const value: number = this.fact.factorial(num);
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
      const output = obj.getFactorial(num);
      finalResponse = {
        data: { factorial: { value: output.value, timeTaken: output.time } },
      };
      ctx.response.body = finalResponse;
    } else {
      responseError = {
        error: {
          reason: "InValid Input ",
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
