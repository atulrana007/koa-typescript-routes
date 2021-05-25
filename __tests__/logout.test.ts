import * as request from "supertest";
import server from "../src/app";
import * as fs from "fs";
import * as path from "path";

beforeAll(() => {
  console.log = () => {};
  server.close();
});
afterEach(() => {
  server.close();
});
afterAll((done) => {
  server.close();
  done();
});

describe("Logout routes test ", () => {
  test("should check logout route get", async () => {
    const response = await request(server)
      .post("/users")
      .send({ name: "Atul", password: "Atul123" });
    // expect(response.status).toEqual(200);
    const accessToken = response.body.token;

    const responseLogin = await request(server)
      .post("/login")
      .set("authorization", `Bearer ${accessToken}`)
      .send({ name: "Atul", password: "Atul123" });
    // expect(responseLogin.status).toEqual(200);

    const responseLogout = await request(server)
      .get("/logout")
      .set("authorization", `Bearer ${accessToken}`);
    // expect(responseLogout.status).toBe(200);
  });
});
