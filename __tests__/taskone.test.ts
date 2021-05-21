import * as request from "supertest";
import server from "../src/app";

beforeAll(() => {
  console.log = () => {};
  server.close();
});

afterEach((done) => {
  server.close();
  done();
});

describe("Task 1 to-do app routes test", () => {
  test("should check home route get", async () => {
    const response = await request(server).get("/task1");
    expect(response.status).toBe(200);
    expect(response.body.title).toEqual("To Do List");
  });
  test("should check add item route post", async () => {
    const response = await request(server)
      .post("/addItems")
      .send({ item: "atul" });
    expect(response.status).toEqual(200);
  });
  test("should check delete route get", async () => {
    const response = await request(server)
      .post("/addItems")
      .send({ item: "atul" });
    expect(response.status).toEqual(200);
    const responseDelete = await request(server).post("/deleteItem/1");
    expect(responseDelete.status).toEqual(200);
  });
  test("should update item route get", async () => {
    const response = await request(server)
      .post("/addItems")
      .send({ item: "atul" });
    expect(response.status).toEqual(200);
    const responseUpdate = await request(server).put("/updateItem/1");
    expect(response.status).toBe(200);
  });
});
