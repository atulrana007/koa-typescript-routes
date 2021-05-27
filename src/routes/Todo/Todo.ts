import * as Router from "koa-router";
import { DefaultContext, DefaultState, ParameterizedContext } from "koa";
import "colors";
import { KoaContext, methods, Response } from "../../types/types";
import { AppContext } from "../../interface/app";
import { ITodoApp } from "../../interface/IToDoApp";

type ToDoResponse = {
  title: string;
  items: any;
};

export class ToDoApp implements ITodoApp {
  public static instance: ToDoApp | undefined = undefined;

  public static getInstance() {
    if (this.instance !== undefined) return this.instance;
    this.instance = new ToDoApp();
    return this.instance;
  }
  private items: Array<{ id: number; value: string }>;
  constructor() {
    this.items = [{ id: 0, value: "Do Something" }];
  }

  home = async () => {
    return Promise.resolve({
      data: { title: "To Do List", items: this.items },
    });
  };
  addItem = async (ctx: AppContext): Promise<Response<ToDoResponse>> => {
    const body: any = ctx.body;
    const item: string = body.item;
    const itemId: number = this.items.length;
    this.items.push({ id: itemId, value: item });
    return Promise.resolve({ message: "Added Successfully" });
  };
  updateItem = async (ctx: AppContext) => {
    const updateId: number = ctx.params.id;
    const body: any = ctx.body;
    const item: string = body.item;
    const index: number = this.items.findIndex((ele) => {
      return ele.id == updateId;
    });
    if (index !== -1) this.items[index].value = item;
    return Promise.resolve({ message: `updated the item with id ${updateId}` });
  };
  deleteItem = async (ctx: AppContext) => {
    const deleteId: number = ctx.params.id;
    const index: number = this.items.findIndex((ele) => {
      return ele.id === deleteId;
    });
    this.items = index !== -1 ? this.items.splice(index, 1) : this.items;
    return Promise.resolve({ data: { items: this.items } });
  };
}

const todoApp = ToDoApp.getInstance();

const routes: { url: string; methods: methods[]; route: Function }[] = [
  {
    url: "/task1",
    methods: ["GET"],
    route: todoApp.home,
  },
  {
    url: "/addItems",
    methods: ["POST"],
    route: todoApp.addItem,
  },
  {
    url: "/deleteItem/:id",
    methods: ["POST"],
    route: todoApp.deleteItem,
  },
  {
    url: "/updateItem/:id",
    methods: ["PUT"],
    route: todoApp.deleteItem,
  },
];

export default routes;
