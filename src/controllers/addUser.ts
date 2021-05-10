import { DefaultState, DefaultContext, ParameterizedContext } from "koa";
import * as bcrypt from "bcrypt";
import * as fs from "fs";
import * as path from "path";

const addUser = (userData: Array<{ name: string; password: string }> = []) => {
  return async function addUsers(
    ctx: ParameterizedContext<DefaultState, DefaultContext>
  ) {
    try {
      const checkUser = userData.findIndex((item) => {
        return item.name === ctx.request.body.name;
      });

      if (checkUser === -1) {
        const hashedPassword = await bcrypt.hash(ctx.request.body.password, 10);
        const user = {
          name: ctx.request.body.name,
          password: hashedPassword,
        };
        userData.push(user);
        fs.writeFile(
          path.join(__dirname, "../data-access/usersData.json"),
          JSON.stringify(userData),
          () => {
            console.log("finished");
          }
        );
        ctx.body = userData;
      } else {
        ctx.status = 500;
        ctx.body = { message: "user already exits" };
      }
    } catch {
      console.log("Directed to catch");
      ctx.status = 500;
      ctx.body = "Internal Server Error";
    }
  };
};

export default addUser;
