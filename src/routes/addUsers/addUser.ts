import { user, methods } from "../../types/index";
import { WebToken } from "../../utils/webToken/wenToken";
import {
  IEncryption,
  IWebToken,
  IAddUser,
  AppContext,
} from "../../interface/index";
import { Encryption } from "../../utils/encrypt/encryption";

export class AddUser implements IAddUser {
  public static instance: AddUser | undefined = undefined;

  public static getInstance(jwt: IWebToken, bcrypt: IEncryption) {
    if (this.instance !== undefined) return this.instance;
    this.instance = new AddUser(jwt, bcrypt);
    return this.instance;
  }

  public userData: Array<user>;
  constructor(
    private readonly jwt: IWebToken,
    private readonly bcrypt: IEncryption
  ) {
    this.userData = [];
  }
  generateAccessToken = (user: user) => {
    return this.jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  };
  addUsers = async (ctx: AppContext, next: any) => {
    try {
      const checkUser =
        this.userData !== [] &&
        this.userData.findIndex((item) => {
          return item.name === ctx.body.name;
        });
      if (checkUser === -1) {
        const hashedPassword = await this.bcrypt.hash(ctx.body.password, 10);
        const user = {
          name: ctx.body.name,
          password: hashedPassword,
        };
        this.userData.push(user);

        const accessToken = this.generateAccessToken(user);
        const refreshToken = this.jwt.sign(
          user,
          process.env.REFRESH_TOKEN_SECRET
        );
        return Promise.resolve({
          data: { auth: true, token: accessToken },
          status: 200,
        });
      } else {
        return Promise.resolve({ message: "user already exits", status: 500 });
      }
    } catch {
      return Promise.resolve({ message: "Internal Server Error", status: 500 });
    }
  };
}

const addUserInstance = (
  jwt: IWebToken = WebToken.getInstance(),
  bcrypt: IEncryption = Encryption.getInstance()
) => AddUser.getInstance(jwt, bcrypt);

const routes: { url: string; methods: methods[]; route: Function }[] = [
  {
    url: "/users",
    methods: ["GET"],
    route: (ctx: AppContext) => {
      return { data: addUserInstance().userData, status: 200 };
    },
  },
  {
    url: "/users",
    methods: ["POST"],
    route: addUserInstance().addUsers,
  },
];

const addedUserData: Array<{ name: string; password: string }> =
  addUserInstance().userData;

export default routes;
export { addedUserData };
