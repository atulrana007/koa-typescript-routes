import IFactorial from "../interface/IFactorial";
import IFactorialTechnique from "../interface/IFactorialTechnique";
import IFactorialRoute from "../interface/IFactorialRoute";
import { Response, errorResponse, methods } from "../types/types";
import { DefaultState, DefaultContext, ParameterizedContext } from "koa";
import { performance } from "perf_hooks";

class RecursiveFactorial implements IFactorial {
  public static instance: RecursiveFactorial | undefined = undefined;

  public static getInstance() {
    if (this.instance !== undefined) return this.instance;
    this.instance = new RecursiveFactorial();
    return this.instance;
  }
  factorial = (num: number) => {
    if (num == 1) return 1;
    return (num * this.factorial(num - 1)) % 1000000007;
  };
}
class MemoizedFactorial implements IFactorial {
  public static instance: MemoizedFactorial | undefined = undefined;

  public static getInstance() {
    if (this.instance !== undefined) return this.instance;
    this.instance = new MemoizedFactorial();
    return this.instance;
  }

  private MemoizedFactorialArray: Array<number> = [1];
  _factorial(num: number) {
    let result =
      this.MemoizedFactorialArray[this.MemoizedFactorialArray.length - 1];
    for (let val = this.MemoizedFactorialArray.length; val <= num; val++) {
      result = (result * val) % 1000000007;
      this.MemoizedFactorialArray.push(result);
    }
  }
  factorial = (num: number) => {
    if (num <= this.MemoizedFactorialArray.length - 1) {
      return this.MemoizedFactorialArray[num];
    } else {
      this._factorial(num);
      return this.MemoizedFactorialArray[num];
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

class FindFactorial implements IFactorialRoute {
  private static instance: FindFactorial | undefined = undefined;

  public static getInstance(
    slow: IFactorialTechnique,
    fast: IFactorialTechnique
  ): FindFactorial {
    if (this.instance !== undefined) return this.instance;
    this.instance = new FindFactorial(slow, fast);
    return this.instance;
  }
  constructor(
    private readonly slow: IFactorialTechnique,
    private readonly fast: IFactorialTechnique
  ) {}

  factorial = async (
    ctx: ParameterizedContext<DefaultState, DefaultContext>
  ) => {
    const num: number = ctx.params.number;
    const query: any = ctx.query?.query;
    let obj: any;
    let finalResponse: Response;
    let responseError: errorResponse;

    if (query !== "fast" && query !== "slow") {
      return Promise.resolve({
        error: {
          reason: "Invalid Request",
          dateTime: new Date(),
          message: "Query Parameter missing",
        },
      });
    } else {
      obj = query === "fast" ? this.fast : this.slow;
    }
    if (num < 1 || num > 100000000) {
      return Promise.resolve({
        error: {
          reason: "Invalid Input",
          dateTime: new Date(),
          message: "Given number is not in valid range",
          details: {
            ["number"]: num,
          },
        },
      });
    }

    const output = obj.getFactorial(num);

    finalResponse = {
      data: { factorial: { value: output.value, timeTaken: output.time } },
    };
    return Promise.resolve(finalResponse);
  };
}

const slow = new FactorialGetter(RecursiveFactorial.getInstance());
const fast = new FactorialGetter(MemoizedFactorial.getInstance());

const findFactorial = FindFactorial.getInstance(slow, fast);

const routes: { url: string; methods: methods[]; route: Function }[] = [
  {
    url: "/api/v1/factorial/:number",
    methods: ["GET"],
    route: findFactorial.factorial,
  },
];

export default routes;
