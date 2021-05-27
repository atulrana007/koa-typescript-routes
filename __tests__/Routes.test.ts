import * as request from "supertest";
import server from "../src/app";

beforeEach(() => {
  console.log = () => {};
  server.close();
});

afterEach(() => {
  server.close();
});
afterAll((done) => {
  done();
});

describe("Testing Auth Routes", () => {
  // test("should check auth route post", async () => {
  //   const response = await request(server)
  //     .post("/users")
  //     .send({ name: "Atul", password: "atul123" });
  //   expect(response.status).toEqual(200);
  // });
  // test("should throw error if multiple users with same name are added", async () => {
  //   const response = await request(server)
  //     .post("/users")
  //     .send({ name: "Atul", password: "atul123" });
  //   const responseTwo = await request(server)
  //     .post("/users")
  //     .send({ name: "Atul", password: "deepu123" });
  //   expect(responseTwo.status).toEqual(500);
  //   expect(responseTwo.body.message).toEqual("user already exits");
  // });
  // test("should check auth route get", async () => {
  //   const response = await request(server)
  //     .post("/users")
  //     .send({ name: "Deepu", password: "deepu123" });
  //   expect(response.status).toEqual(200);
  //   const responseGet = await request(server).get("/users");
  //   expect(responseGet.status).toEqual(200);
  //   expect(responseGet.body.data[0].name).toEqual("Atul");
  // });
  // test("should login user if valid name or password are added", async () => {
  //   const response = await request(server)
  //     .post("/users")
  //     .send({ name: "Ankit", password: "Ankit123" });
  //   expect(response.status).toEqual(200);
  //   const accessToken = response.body.token;
  //   const responseLogin = await request(server)
  //     .post("/login")
  //     .set("authorization", `Bearer ${accessToken}`)
  //     .send({ name: "Ankit", password: "Ankit123" });
  //   expect(responseLogin.status).toEqual(200);
  // });
  // test("should throw error if invalid name or password are added", async () => {
  //   const response = await request(server)
  //     .post("/users")
  //     .send({ name: "Shaurya", password: "shaurya123" });
  //   expect(response.status).toEqual(200);
  //   const accessToken = response.body.token;
  //   const responseLogin = await request(server)
  //     .post("/login")
  //     .send({ name: "Shaurya", password: "Ankit123" })
  //     .set("authorization", accessToken);
  //   expect(responseLogin.status).toEqual(500);
  //   expect(responseLogin.body.message).toEqual("Invalid Username or password");
  // });
  // test("should check logout route get", async () => {
  //   const response = await request(server)
  //     .post("/users")
  //     .send({ name: "Ritika", password: "Ritika123" });
  //   expect(response.status).toBe(200);
  //   const accessToken = response.body.token;
  //   const responseLogin = await request(server)
  //     .post("/login")
  //     .set("authorization", `Bearer ${accessToken}`)
  //     .send({ name: "Ritika", password: "Ritika123" });
  //   expect(responseLogin.status).toEqual(200);
  //   const responseLogout = await request(server)
  //     .get("/logout")
  //     .set("authorization", `Bearer ${accessToken}`);
  //   expect(responseLogout.status).toBe(200);
  // });
});

describe("Testing Factorial routes for Memoization Technique", () => {
  it("should check if the route return ok response when query parameter fast is passed", async () => {
    const response = await request(server).get(
      "/api/v1/factorial/4?query=fast"
    );
    expect(response.status).toEqual(200);
  });
  it("should check if the route return factorial when query parameter fast is passed", async () => {
    const response = await request(server).get(
      "/api/v1/factorial/3?query=fast"
    );
    expect(response.body.data.factorial.value).toEqual(6);
  });
});
describe("Testing Factorial routes for Recursive Technique", () => {
  it("should check if the route return ok response when query parameter slow is passed", async () => {
    const response = await request(server).get(
      "/api/v1/factorial/4?query=slow"
    );
    expect(response.status).toEqual(200);
  });
  it("should check if the route return factorial when query parameter slow is passed", async () => {
    const response = await request(server).get(
      "/api/v1/factorial/4?query=slow"
    );
    expect(response.body.data.factorial.value).toEqual(24);
  });
});

describe("Task 1 to-do app routes test", () => {
  test("should check home route get", async () => {
    const response = await request(server).get("/task1");
    expect(response.status).toBe(200);
    expect(response.body.data.title).toEqual("To Do List");
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
    expect(responseUpdate.status).toBe(200);
  });
});

describe("Task 0 simple routes test", () => {
  test("should check home route get", async () => {
    const response = await request(server).get("/task0");
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Task 0");
  });
  test("should check hello route get", async () => {
    const response = await request(server).get("/hello");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("world");
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
