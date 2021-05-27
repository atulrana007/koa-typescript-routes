import { Response } from "../types/types";
import { AppContext } from "../types/app";

type ToDoResponse = {
  title?: string;
  items: any;
};
export interface ITodoApp {
  home: () => Promise<Response<ToDoResponse>>;
  addItem: (ctx: AppContext) => Promise<Response<ToDoResponse>>;
  updateItem: (ctx: AppContext) => Promise<Response<ToDoResponse>>;
  deleteItem: (ctx: AppContext) => Promise<Response<ToDoResponse>>;
}
