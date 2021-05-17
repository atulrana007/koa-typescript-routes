import * as request from "supertest";
import server from "../src/app";

beforeAll(() => {
  console.log = () => {};
  server.close();
});

afterAll(() => {
  server.close();
});

afterEach((done) => {
  server.close();
  done();
});

describe("Task 0 simple routes test", () => {
  test("should check home route get", async () => {
    const response = await request(server).get("/task0");
    expect(response.status).toBe(200);
    expect(response.body.msg).toEqual("Task 0");
  });
  test("should check hello route get", async () => {
    const response = await request(server).get("/hello");
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe("world");
  });
  test("should check echo route get", async () => {
    const response = await request(server).get("/echo?name=atul");
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("atul");
  });
  test("should check error route get", async () => {
    const response = await request(server).get("/error");
    expect(response.status).toBe(500);
  });
});
