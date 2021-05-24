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
  it("should throw error if input number is out of range", async () => {
    const response = await request(server).get(
      "/api/v1/factorial/0?query=fast"
    );
    expect(response.body.error.reason).toEqual("Invalid Input");
  });
  it("should throw error if input number is out of range", async () => {
    const response = await request(server).get(
      "/api/v1/factorial/1000000000?query=fast"
    );
    expect(response.body.error.reason).toEqual("Invalid Input");
  });
  it("should throw error if no query parameter are passed as", async () => {
    const response = await request(server).get("/api/v1/factorial/10");
    expect(response.body.error.reason).toEqual("Invalid Request");
  });
});
