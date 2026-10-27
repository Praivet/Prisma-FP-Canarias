//Comment for other developers: Any question, ask JP or check out the prisma organization docs here: https://docs.google.com/document/d/1LFWr4dQsPcH8lydZjAEaxMwlPW2INK4ucyzxXhBc8Gg/edit?tab=t.0

import { describe, it, expect } from "vitest"; // Describe: Groups the tests, it: Defines a test case, expect: verifies the expected result
import request from "supertest";
import { app } from "../src/app";

describe("API", () => {
  it("GET / responde 200", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("API funcionando");
  });

  it("una ruta inexistente devuelve 404", async () => {
    const res = await request(app).get("/no-existe");
    expect(res.status).toBe(404);
  });
});

