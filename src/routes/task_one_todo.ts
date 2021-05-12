import * as Koa from "koa";
import * as Router from "koa-router";
import { DefaultContext, DefaultState, ParameterizedContext } from "koa";
import "colors";

const router: Router = new Router();

let items: Array<{ id: number; value: string }> = [
  { id: 0, value: "Do Something" },
];

router.get(
  "/",
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    await ctx.render("index", {
      title: "To Do List",
      items: items,
    });
  }
);

router.get(
  "/addItems",
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    await ctx.render("add");
  }
);

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

export default router;
