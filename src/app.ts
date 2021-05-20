import * as Koa from "koa";
import { DefaultState, DefaultContext, ParameterizedContext } from "koa";
import * as bodyParser from "koa-bodyparser";
import * as dotenv from "dotenv";
import FinalRouter from "./routes/index";

dotenv.config({ path: __dirname + "/.env" });

const port = process.env.PORT || 5000;

const app: Koa<DefaultState, DefaultContext> = new Koa();

app.use(bodyParser());

FinalRouter.map((item) => app.use(item.routes()).use(item.allowedMethods()));

const server = app.listen(port).on("listening", () => {
  console.log(`Listening at Port ${port}...`);
});

export default server;
