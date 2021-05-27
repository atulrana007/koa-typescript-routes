import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { AppContext } from "../../interface/app";
import { methods } from "../../types/types";
import { addUserResponse, user } from "../../types/responses/addUserResponse";
import { IAddUser } from "../../interface/IAddUser";

export class AddUser implements IAddUser {
  public static instance: AddUser | undefined = undefined;

  public static getInstance() {
    if (this.instance !== undefined) return this.instance;
    this.instance = new AddUser();
    return this.instance;
  }

  public userData: Array<user>;
  constructor() {
    this.userData = [];
  }
  generateAccessToken = (user: user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "5m",
    });
  };
  addUsers = async (ctx: AppContext, next: any) => {
    try {
      const checkUser =
        this.userData !== [] &&
        this.userData.findIndex((item) => {
          return item.name === ctx.body.name;
        });
      if (checkUser === -1) {
        const hashedPassword = await bcrypt.hash(ctx.body.password, 10);
        const user = {
          name: ctx.body.name,
          password: hashedPassword,
        };
        this.userData.push(user);

        const accessToken = this.generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
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

const addUserRoutes = AddUser.getInstance();

const routes: { url: string; methods: methods[]; route: Function }[] = [
  {
    url: "/users",
    methods: ["GET"],
    route: (ctx: AppContext) => {
      return { data: addUserRoutes.userData, status: 200 };
    },
  },
  {
    url: "/users",
    methods: ["POST"],
    route: addUserRoutes.addUsers,
  },
];

const addedUserData: Array<{ name: string; password: string }> =
  addUserRoutes.userData;

export default routes;
export { addedUserData };
