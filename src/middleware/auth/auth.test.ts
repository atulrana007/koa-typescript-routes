import { IEncryption } from "../../interface";
import { AppContext, AppMiddleWareContext } from "../../interface/app";
import { IWebToken } from "../../interface/IWebToken";
import { MockEncryption } from "../../utils/encrypt/test-utils/MockEncryption";
import { MockWebToken } from "../../utils/webToken/test-util/MockWebToken";

import { Authentication } from "./auth";

beforeAll(() => {
  console.log = () => {};
});

describe("Testing Add Authentication Class", () => {
  const mockWebTokenInstance = new MockWebToken();
  const mockBcryptInstance = new MockEncryption();
  const authenticatingInstance = (
    jsonToken: IWebToken = mockWebTokenInstance,
    bcrypt: IEncryption = mockBcryptInstance
  ) =>
    new Authentication(
      [{ name: "Atul", password: "123abc" }],
      jsonToken,
      bcrypt
    );
  test("should check if generateAccessToken method works fine", async () => {
    let respMessage: string;
    const request = {
      path: "/login",
      request: {
        body: { name: "Atul", password: "123abc" },
        headers: { authentication: "Bearer 123" },
      },
    } as unknown as AppMiddleWareContext;
    mockWebTokenInstance.setResponse("Authenticate AccessToken");
    await authenticatingInstance().authenticateToken(request, () => {
      respMessage = "Authenticate AccessToken";
    });
    expect(request.request.body.isLoggedIn).toBe(true);
  });
  test("should check if Login method works fine", async () => {
    mockBcryptInstance.setResponse({
      hashResponse: "123",
      compareResponse: true,
    });
    const request = {
      path: "/login",
      request: {
        body: { name: "Atul", password: "123abc" },
        headers: { authentication: "Bearer 123" },
      },
      body: {},
    } as unknown as AppMiddleWareContext;
    mockWebTokenInstance.setResponse("Login In User");
    await authenticatingInstance().login(request, () => {});
    expect(request.body.isLoggedIn).toBe(true);
  });
  test("should check if Login throws error when wrong username or password are written", async () => {
    mockBcryptInstance.setResponse({
      hashResponse: "123",
      compareResponse: false,
    });
    const request = {
      path: "/login",
      request: {
        body: { name: "Atul", password: "123ab" },
        headers: { authentication: "Bearer 123" },
      },
      body: {},
    } as unknown as AppMiddleWareContext;
    mockWebTokenInstance.setResponse("Login In User");
    await authenticatingInstance().login(request, () => {});
    expect(request.body.isLoggedIn).toBe(false);
  });
  test("should check if Logout methods works fine", async () => {
    let response: string;
    const request = {
      path: "/logout",
      request: {
        body: { name: "Atul", password: "123ab" },
        headers: { authentication: "Bearer 123" },
      },
      body: {},
    } as unknown as AppMiddleWareContext;
    mockWebTokenInstance.setResponse("Login In User");
    const resp = await authenticatingInstance().login(request, () => {
      response = "Logged Out";
    });
    expect(response).toBe("Logged Out");
  });
});
