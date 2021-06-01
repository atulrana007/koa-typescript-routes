import * as request from "supertest";
import { MockServer } from "../src/utils/server/MockServer";

beforeEach(() => {
  // console.log = () => {};
  console.error = () => {};
});

afterAll((done) => {
  done();
});

describe("Testing Factorial routes for Memoization Technique", () => {
  const server = new MockServer();
  it("should check if the route return ok response when query parameter fast is passed", async () => {
    server.setResponse<any>({ status: 200 }, "GET");
    const response = await server.get("/api/v1/factorial/4?query=fast");
    expect(response.status).toEqual(200);
  });
  it("should check if the route return factorial when query parameter fast is passed", async () => {
    server.setResponse<any>(
      { body: { data: { factorial: { value: 6 } } } },
      "GET"
    );
    const response = await server.get("/api/v1/factorial/3?query=fast");
    expect(response.body.data.factorial.value).toEqual(6);
  });
});
describe("Testing Factorial routes for Recursive Technique", () => {
  const server = new MockServer();
  it("should check if the route return ok response when query parameter slow is passed", async () => {
    server.setResponse<any>({ status: 200 }, "GET");
    const response = await server.get("/api/v1/factorial/4?query=slow");
    expect(response.status).toEqual(200);
  });
  it("should check if the route return factorial when query parameter slow is passed", async () => {
    server.setResponse<any>(
      { body: { data: { factorial: { value: 24 } } } },
      "GET"
    );
    const response = await server.get("/api/v1/factorial/4?query=slow");
    expect(response.body.data.factorial.value).toEqual(24);
  });
});

describe("Task 1 to-do app routes test", () => {
  const server = new MockServer();
  test("should check home route get", async () => {
    server.setResponse<any>(
      { body: { data: { title: "To Do List" } }, status: 200 },
      "GET"
    );
    const response = await server.get("/task1");
    expect(response.status).toBe(200);
    expect(response.body.data.title).toEqual("To Do List");
  });
  test("should check add item route post", async () => {
    server.setResponse<any>({ status: 200 }, "POST");
    const response = await server.post("/addItems").send({ item: "atul" });
    expect(response.status).toEqual(200);
  });
  test("should check delete route ", async () => {
    server.setResponse<any>({ status: 200 }, "DELETE");
    const responseDelete = await server.delete("/deleteItem/1");
    expect(responseDelete.status).toEqual(200);
  });
  test("should update item route get", async () => {
    server.setResponse<any>({ status: 200 }, "PUT");
    const responseUpdate = await server.put("/updateItem/1");
    expect(responseUpdate.status).toBe(200);
  });
});

describe("Task 0 simple routes test", () => {
  const server = new MockServer();
  test("should check home route get", async () => {
    server.setResponse<any>(
      { status: 200, body: { message: "Task 0" } },
      "GET"
    );
    const response = await server.get("/task0");
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Task 0");
  });
  test("should check hello route get", async () => {
    server.setResponse<any>({ status: 200, body: { message: "world" } }, "GET");
    const response = await server.get("/hello");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("world");
  });
  test("should check echo route get", async () => {
    server.setResponse<any>({ status: 200, body: { name: "atul" } }, "GET");
    const response = await server.get("/echo?name=atul");
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("atul");
  });
  test("should check error route get", async () => {
    server.setResponse<any>({ status: 500 }, "GET");
    const response = await server.get("/error");
    expect(response.status).toBe(500);
  });
});
