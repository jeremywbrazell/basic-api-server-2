"use strict";

const { server } = require("../src/server.js");
const supertest = require("supertest");
const mockRequest = supertest(server);

const { db } = require("../src/models/index.js");
const { NotificationResponseMessage } = require("pg-protocol/dist/messages");

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

  it("should respond with a bad method", async () => {
    const response = await mockRequest.post("/foo");
    expect(response.status).toBe(404);
  });

  it("should create new food in the db", async () => {
    const fakeData = {
      foodName: "pizza",
      cuisine: "italian",
      calories: 5000,
    };
    const response = await mockRequest.post("/food").send(fakeData);
    console.log("response.body", response.body);
    expect(response.status).toBe(200);
    expect(response.body.foodName).toEqual("pizza");
  });

  it("should get a list of food records", async () => {
    const response = await mockRequest.get("/food");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toEqual(1);
    console.log(response.body);
    expect(Array.isArray(response.body)).not.toBeFalsy();
  });
  it("can get a food record", async () => {
    const response = await mockRequest.get("/food/1");
    expect(response.status).toBe(200);
    expect(typeof response.body).toEqual("object");
    expect(response.body.id).toEqual(1);
    expect(response.status).not.toBe(500);
  });
  it("can update a food record", async () => {
    const data = { 
      foodName: "ravioli",
      cuisine: "italian"
     };
    const response = await mockRequest.put('/food/1').send(data);
    expect(response.status).toBe(200);
    expect(typeof response.body).toEqual("object");
    expect(response.body.id).toEqual(1);
    expect(response.body.foodName).toEqual("ravioli");
    expect(response.body.cuisine).toEqual("italian");
  });
  it("can delete a food record", async () => {
    const response = await mockRequest.delete('/food/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(1);
    expect(response.status).not.toBe(404);
  })

});

