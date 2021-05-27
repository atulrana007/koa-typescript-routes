import { AppContext } from "../../interface/app";
import { SimpleRoute } from "./simpleRoutes";

describe("Testing SimpleRoute Class", () => {
  const simpleRoutesInstance = new SimpleRoute();
  test("should check if hello method works fine", () => {
    const resp = simpleRoutesInstance.hello();
    expect(resp.message).toBe("world");
  });
  test("should check if home method works fine", () => {
    const resp = simpleRoutesInstance.home();
    expect(resp.message).toBe("Task 0");
  });
  test("should check if echo method works fine", () => {
    const resp = simpleRoutesInstance.echo({
      query: "Atul",
    } as unknown as AppContext);
    expect(resp).toBe("Atul");
  });
  test("should check if error method works fine", () => {
    const resp = simpleRoutesInstance.error();
    expect(resp.message).toBe("Internal server error");
  });
});
