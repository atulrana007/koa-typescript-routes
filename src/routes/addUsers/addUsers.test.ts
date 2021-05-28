import { IEncryption } from "../../interface";
import { AppContext } from "../../interface/app";
import { IWebToken } from "../../interface/IWebToken";
import { Encryption } from "../../utils/encrypt/encryption";
import { MockWebToken } from "../../utils/webToken/test-util/MockWebToken";
import { AddUser } from "./addUser";

beforeAll(() => {
  console.log = () => {};
});

describe("Testing Add User Class", () => {
  const mockWebTokenInstance = new MockWebToken();
  const addUserInstance = (
    jsonToken: IWebToken = mockWebTokenInstance,
    bcrypt: IEncryption = new Encryption()
  ) => new AddUser(jsonToken, bcrypt);
  test("should check if generateAccessToken method works fine", () => {
    mockWebTokenInstance.setResponse("Generate AccessToken");
    const resp = addUserInstance().generateAccessToken({
      name: "Atul",
      password: "pass",
    });
    expect(resp).toBe("Generate AccessToken");
  });
  test("should check if add User method works fine", async () => {
    mockWebTokenInstance.setResponse("AccessToken1234");
    const resp = await addUserInstance().addUsers(
      {
        body: {
          name: "Atul",
          password: "pass",
        },
      } as unknown as AppContext,
      {}
    );
    expect(resp["data"].token).toBe("AccessToken1234");
  });
});
