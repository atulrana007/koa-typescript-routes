import * as request from "supertest";
import server from "../src/app";

beforeAll(() => {
  console.log = () => {};
  server.close();
});

afterAll(() => {
  server.close();
});

describe("Testing Factorial routes", () => {
  it("should check if the route return ok response when no query parameter are passed", async () => {
    const response = await request(server).get("/api/v1/factorial/4");
    expect(response.status).toEqual(200);
  });
  it("should check if the route return factorial when no query parameter are passed", async () => {
    const response = await request(server).get("/api/v1/factorial/4");
    expect(response.body.data.factorial.value).toEqual(24);
  });
  it("should check if the route return ok response when query parameter fast is passed", async () => {
    const response = await request(server).get(
      "/api/v1/factorial/4?query=fast"
    );
    expect(response.status).toEqual(200);
  });
  it("should check if the route return factorial when query parameter fast is passed", async () => {
    const response = await request(server).get(
      "/api/v1/factorial/4?query=fast"
    );
    expect(response.body.data.factorial.value).toEqual(24);
  });
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
  it("should throw error if input number is out of range", async () => {
    const response = await request(server).get("/api/v1/factorial/0");
    expect(response.body.error.reason).toEqual("Invalid Input");
  });
  it("should throw error if input number is out of range", async () => {
    const response = await request(server).get("/api/v1/factorial/1000000000");
    expect(response.body.error.reason).toEqual("Invalid Input");
  });
  it("should throw error if input number is out of range", async () => {
    const response = await request(server).get(
      "/api/v1/factorial/40000?query=slow"
    );
    expect(response.body.error.reason).toEqual("RangeError");
  });
});
