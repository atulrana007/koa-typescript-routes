import * as Koa from "koa";
import { DefaultState, DefaultContext, ParameterizedContext } from "koa";
import * as bodyParser from "koa-bodyparser";
import * as dotenv from "dotenv";
import FinalRouter from "./routes/routesRegistry";
import Authenticate from "./middleware/auth";
import { AppContext, AppState } from "./interface/app";

dotenv.config({ path: __dirname + "/.env" });

const port = process.env.PORT || 5000;

const app: Koa<AppState, AppContext> = new Koa<AppState, AppContext>();

app.use(bodyParser());
app.use(Authenticate.login);
app.use(Authenticate.logout);

app.use(FinalRouter.routes()).use(FinalRouter.allowedMethods());

const server = app.listen(port).on("listening", () => {
  console.log(`Listening at Port ${port}...`);
});

export default server;
