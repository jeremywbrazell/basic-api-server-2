"use strict";

const { server } = require("../src/server.js");
const supertest = require("supertest");
const mockRequest = supertest(server);

const { db } = require('../src/models/index.js');

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe("API server", () => {
  it("should respond with a 404 invalid route", () => {
    return mockRequest.get("/badroute").then((data) => {
      expect(data.status).toBe(404);
    });
  });

  it("should respond with a bad method", () => {
    return mockRequest.get("/PATCH").then((data) => {
      expect(data.status).toBe(404);
    });
  });

  it("should create new food in the db", async() => {
    const fakeData = {
      foodName: "pizza",
      cuisine: "italian",
      calories: "5000"
    }
    const response = await mockRequest.post("/food").send(fakeData);
    expect(response.status).toBe(200);
    });
});

