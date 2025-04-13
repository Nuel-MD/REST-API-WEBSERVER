import request from "supertest";
import app from "../app";

describe("Health Check Endpoint", () => {
  it("should return a healthy status", async () => {
    const response = await request(app).get("/api/v1/healthcheck");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "healthy");
    expect(response.body).toHaveProperty("timestamp");
    expect(response.body).toHaveProperty("uptime");
  });
});
