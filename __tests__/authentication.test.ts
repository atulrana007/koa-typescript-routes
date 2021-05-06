import * as request from "supertest";
import server from "../src/authentication";

afterEach((done) => {
  server.close();
  done();
});

describe("Basic Routes test", () => {
  test("get home route GET", async () => {
    const response = await request(server).get("/");
    expect(response.status).toEqual(200);
    expect(response.body);
  });
  test("should check auth route post", async () => {
    const response = await request(server)
      .post("/users")
      .send({ name: "Atul", password: "atul123" });
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual("Atul");
  });
  test("should check auth route post", async () => {
    const response = await request(server)
      .post("/users")
      .send({ name: "Atul", password: "atul123" });
    const responseUser = await request(server).get("/users");
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual("Atul");
  });
  test("should login user if valid name or password are added", async () => {
    const response = await request(server)
      .post("/users")
      .send({ name: "Ankit", password: "Ankit123" });
    expect(response.status).toEqual(200);

    const responseLogin = await request(server)
      .post("/users/login")
      .send({ name: "Atul", password: "atul123" });
    expect(responseLogin.status).toEqual(200);
    expect(responseLogin.body.text).toEqual("success");
  });
  test("should throw error if invalid name or password are added", async () => {
    const response = await request(server)
      .post("/users")
      .send({ name: "Shaurya", password: "shaurya123" });
    expect(response.status).toEqual(200);

    const responseLogin = await request(server)
      .post("/users/login")
      .send({ name: "Shaurya", password: "Ankit123" });
    expect(responseLogin.status).toEqual(200);
    expect(responseLogin.body.text).toEqual("invalid UserName or password");
  });
});
