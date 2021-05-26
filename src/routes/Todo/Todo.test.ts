import { KoaContext } from "../../types/types";
import { ToDoApp } from "./Todo";

describe("Testing ToDo Class", () => {
  const todoInstance = new ToDoApp();
  test("should check home method works fine", async () => {
    const resp = await todoInstance.home();
    expect(resp.title).toBe("To Do List");
  });
  test("should check addItem method works fine", async () => {
    const request = { request: { body: "New item added" } };
    const resp = await todoInstance.addItem(request as unknown as KoaContext);
    expect(resp.msg).toBe("Added Successfully");
  });
  test("should check updateItem method works fine", async () => {
    const request = { request: { body: "New item added" }, params: { id: 1 } };
    const resp = await todoInstance.updateItem(
      request as unknown as KoaContext
    );
    expect(resp.msg).toBe("updated the item with id 1");
  });
  test("should check deleteItem method works fine", async () => {
    const request = { params: { id: 0 } };
    const resp = await todoInstance.deleteItem(
      request as unknown as KoaContext
    );
    expect(resp).not.toBe(null);
  });
});
