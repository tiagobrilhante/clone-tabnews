import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous User", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const response = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        expect(response.status).toBe(201);
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toEqual(true);
        expect(responseBody.length).toBeGreaterThan(0);
      });

      test("For the second time", async () => {
        const response1 = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        expect(response1.status).toBe(200);
        const response1Body = await response1.json();
        expect(Array.isArray(response1Body)).toEqual(true);
        expect(response1Body.length).toBe(0);
      });
    });
  });
});
