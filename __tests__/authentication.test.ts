import * as request from "supertest";
<<<<<<< HEAD
import server from "../src/app";
import * as fs from "fs";
import * as path from "path";

beforeAll(() => {
  console.log = () => {};
=======
import server from "../src/authentication";
import * as fs from "fs";
import * as path from "path";

// beforeEach(() => {});

afterEach((done) => {
  fs.writeFile(
    path.join(__dirname, "../data-access/usersData.json"),
    JSON.stringify([]),
    () => {}
  );
>>>>>>> 4567936... added class based routing
  server.close();
});

afterEach(() => {
  server.close();
});
afterAll((done) => {
  done();
});

describe("Auth Routes test", () => {
  test.only("should check auth route post", async () => {
    const response = await request(server)
      .post("/users")
      .send({ name: "Atul", password: "atul123" });
    // expect(response.status).toEqual(200);
  });
  test("should throw error if multiple users with same name are added", async () => {
    const response = await request(server)
      .post("/users")
      .send({ name: "Atul", password: "atul123" });
    const responseTwo = await request(server)
      .post("/users")
      .send({ name: "Atul", password: "deepu123" });
    expect(responseTwo.status).toEqual(500);
    expect(responseTwo.body.message).toEqual("user already exits");
  });
  test("should check auth route get", async () => {
    const response = await request(server)
      .post("/users")
      .send({ name: "Deepu", password: "deepu123" });
    expect(response.status).toEqual(200);
    const responseGet = await request(server).get("/users");
    expect(responseGet.status).toEqual(200);
    expect(responseGet.body[0].name).toEqual("Atul");
  });
  test("should login user if valid name or password are added", async () => {
    const response = await request(server)
      .post("/users")
      .send({ name: "Ankit", password: "Ankit123" });
    expect(response.status).toEqual(200);
    const accessToken = response.body.token;

    const responseLogin = await request(server)
      .post("/login")
      .set("authorization", `Bearer ${accessToken}`)
      .send({ name: "Ankit", password: "Ankit123" });

    expect(responseLogin.status).toEqual(200);
  });

  test("should throw error if invalid name or password are added", async () => {
    const response = await request(server)
      .post("/users")
      .send({ name: "Shaurya", password: "shaurya123" });
    expect(response.status).toEqual(200);
    const accessToken = response.body.token;

    const responseLogin = await request(server)
      .post("/login")
      .send({ name: "Shaurya", password: "Ankit123" })
      .set("authorization", accessToken);
    expect(responseLogin.status).toEqual(500);
    expect(responseLogin.body.message).toEqual("Invalid Username or password");
  });
});
