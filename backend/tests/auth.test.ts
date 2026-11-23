// These tests do not need the database: every request is rejected before any query is made.
import { describe, it, expect } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import { app } from "../src/app";
import { env } from "../src/config/env";
import { JWT_AUDIENCE, JWT_ISSUER } from "../src/modules/auth/auth.service";

const basic = (credentials: string) => `Basic ${Buffer.from(credentials).toString("base64")}`;

describe("Basic Auth (login / register)", () => {
  it("login without Authorization header responds 401", async () => {
    const res = await request(app).post("/api/auth/login");
    expect(res.status).toBe(401);
    expect(res.headers["www-authenticate"]).toContain("Basic");
  });

  it("login with a Bearer header instead of Basic responds 401", async () => {
    const res = await request(app).post("/api/auth/login").set("Authorization", "Bearer abc");
    expect(res.status).toBe(401);
  });

  it("credentials without ':' respond 401", async () => {
    const res = await request(app).post("/api/auth/login").set("Authorization", basic("onlyemail"));
    expect(res.status).toBe(401);
  });

  it("register without firstName/lastName responds 400", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .set("Authorization", basic("new@prismafp.test:Password123!"));
    expect(res.status).toBe(400);
  });
});

describe("Bearer Auth (protected routes)", () => {
  it("GET /api/skills without token responds 401", async () => {
    const res = await request(app).get("/api/skills");
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Se requiere un token Bearer");
  });

  it("a token signed with another secret responds 401", async () => {
    const token = jwt.sign({ roles: [] }, "not-our-secret", {
      subject: "1",
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });
    const res = await request(app).get("/api/skills").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(401);
  });

  it("an expired token responds 401", async () => {
    const token = jwt.sign(
      { roles: [], exp: Math.floor(Date.now() / 1000) - 60 },
      env.JWT_SECRET,
      { subject: "1", issuer: JWT_ISSUER, audience: JWT_AUDIENCE }
    );
    const res = await request(app).get("/api/students").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Token no válido o caducado");
  });
});
