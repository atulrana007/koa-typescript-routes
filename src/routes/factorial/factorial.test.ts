import { AppContext } from "../../types";

import {
  RecursiveFactorial,
  MemoizedFactorial,
  FactorialGetter,
  FindFactorial,
} from "./factorial";

describe("Testing Recursive Factorial Class", () => {
  const recursiveInstance = new RecursiveFactorial();
  test("should check if factorial methods returns correct answer", () => {
    const resp = recursiveInstance.factorial(5);
    expect(resp).toBe(120);
  });
});

describe("Testing Memoized Factorial Class", () => {
  const memoizedInstance = new MemoizedFactorial();
  test("should check if factorial methods returns correct answer", () => {
    const resp = memoizedInstance.factorial(5);
    expect(resp).toBe(120);
  });
});
describe("Testing FactorialGetter Class", () => {
  const recursiveInstance = new RecursiveFactorial();
  const memoizedInstance = new MemoizedFactorial();
  test("should check if get factorial methods returns correct answer for recursive instance", () => {
    const factorialGetterInstance = new FactorialGetter(recursiveInstance);
    const resp = factorialGetterInstance.getFactorial(5);
    expect(resp.value).toBe(120);
  });
  test("should check if get factorial methods returns correct answer for memoized instance", () => {
    const factorialGetterInstance = new FactorialGetter(recursiveInstance);
    const resp = factorialGetterInstance.getFactorial(5);
    expect(resp.value).toBe(120);
  });
});

describe("Testing FindFactorial Class", () => {
  const recursiveInstance = new RecursiveFactorial();
  const memoizedInstance = new MemoizedFactorial();
  const slow = new FactorialGetter(recursiveInstance);
  const fast = new FactorialGetter(memoizedInstance);
  const findFactorialInstance = new FindFactorial(slow, fast);
  test("should check if factorial methods returns correct answer", async () => {
    const request = { query: { query: "fast" }, params: { number: 5 } };
    const resp = await findFactorialInstance.factorial(
      request as unknown as AppContext
    );
    expect(resp["data"].factorial?.value).toBe(120);
  });
  test("should throw error when query parameter not passed", async () => {
    const request = { params: { number: 5 } };
    const resp = await findFactorialInstance.factorial(
      request as unknown as AppContext
    );
    expect(resp["error"]?.reason).toBe("Invalid Request");
  });
  test("should throw error when number not in range is passed as parameter", async () => {
    const request = { query: { query: "fast" }, params: { number: 0 } };
    const resp = await findFactorialInstance.factorial(
      request as unknown as AppContext
    );
    expect(resp["error"]?.reason).toBe("Invalid Input");
  });
});
