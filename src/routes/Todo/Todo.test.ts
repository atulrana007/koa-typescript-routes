import { AppContext } from "../../interface/app";
import { ToDoApp } from "./Todo";

beforeAll(() => {
  console.log = () => {};
});

describe("Testing ToDo Class", () => {
  const todoInstance = new ToDoApp();
  test("should check home method works fine", async () => {
    const resp = await todoInstance.home();
    expect(resp.data.title).toBe("To Do List");
  });
  test("should check addItem method works fine", async () => {
    const request = { body: "New item added" };
    const resp = await todoInstance.addItem(request as unknown as AppContext);
    expect(resp.message).toBe("Added Successfully");
  });
  test("should check updateItem method works fine", async () => {
    const request = { body: "New item added", params: { id: 1 } };
    const resp = await todoInstance.updateItem(
      request as unknown as AppContext
    );
    expect(resp.message).toBe("updated the item with id 1");
  });
  test("should check deleteItem method works fine", async () => {
    const request = { params: { id: 0 } };
    const resp = await todoInstance.deleteItem(
      request as unknown as AppContext
    );
    expect(resp).not.toBe(null);
  });
});
