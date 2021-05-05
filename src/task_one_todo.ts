import * as Koa from "koa";
import * as Router from "koa-router";
import { DefaultContext, DefaultState, ParameterizedContext } from "koa";
import * as bodyParser from "koa-bodyparser";
import * as render from "koa-ejs";
import * as serve from "koa-static";
import "colors";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
// import * as methodOverride from "koa-methodoverride";
dotenv.config({ path: __dirname + "/.env" });

const port = process.env.PORT || 5000;
const staticDir = path.join(__dirname + "/..", "public/css");
console.log(staticDir);

// const StyleCss: object = {
//   style: fs.readFileSync(path.join(__dirname + "/..", "public/css/styles.css")),
// };
// console.log(StyleCss);
const app: Koa<DefaultState, DefaultContext> = new Koa();
const router: Router = new Router();

app.use(bodyParser());
// app.use(methodOverride("_method"));
app.use(serve(staticDir));

let items: Array<{ id: number; value: string }> = [
  { id: 0, value: "Do Something" },
];

render(app, {
  root: path.join(__dirname + "/..", "views"),
  layout: "layout",
  viewExt: "html",
  cache: false,
  debug: false,
});

router.get(
  "/",
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    await ctx.render("index", {
      title: "To Do List",
      items: items,
    });
  }
);

// router.get;

router.get(
  "/addItems",
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    await ctx.render("add");
  }
);
// router.get(
//   "/public/css/styles.css",
//   async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
//     ctx.body = StyleCss;
//   }
// )

const add = async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
  const body: any = ctx.request.body;
  const item: string = body.item;
  const itemId: number = items.length;
  items.push({ id: itemId, value: item });
  ctx.response.body = "Added Successfully";
  ctx.redirect("/");
};

router.post("/addItems", add);

router.del(
  "/deleteItem/id",
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    const deleteId: number = ctx.params.id;
    const index: number = items.findIndex((ele) => {
      return ele.id === deleteId;
    });
    console.log("deleting Index", index);
    items = index !== -1 ? items.splice(index, 1) : items;
    console.log(items);
    ctx.redirect("/");
  }
);

router.put(
  "/updateItem/:id",
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    const updateId: number = ctx.params.id;
    const body: any = ctx.request.body;
    const item: string = body.item;
    const index: number = items.findIndex((ele) => {
      return ele.id == updateId;
    });
    console.log("final_index", index);
    if (index !== -1) items[index].value = item;
    ctx.redirect("/");
  }
);

app.use(router.routes()).use(router.allowedMethods());

app.listen(port).on("listening", () => {
  console.log(`Listening at port ${port}...`);
});
