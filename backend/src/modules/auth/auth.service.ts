import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../../config/env.js";
import { User } from "../user/user.model.js";
import { Role } from "../rbac/role.model.js";
import { UserRole } from "../rbac/user-role.model.js";

// iss / aud claims: who issues the token and who it is meant for.
export const JWT_ISSUER = "prisma-fp-api";
export const JWT_AUDIENCE = "prisma-fp-client";

// Cost factor of bcrypt: 12 rounds = 2^12 iterations. Slower to compute = harder to brute force.
const BCRYPT_ROUNDS = 12;

// Role given to anyone who signs up on their own.
const DEFAULT_ROLE = "STUDENT";

export type LoginResult =
  | { ok: true; user: User; roles: string[] }
  | { ok: false; reason: "INVALID_CREDENTIALS" | "INACTIVE" | "LOCKED" };

export class AuthService {
  static async validateCredentials(email: string, password: string): Promise<LoginResult> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return { ok: false, reason: "INVALID_CREDENTIALS" };
    }

    // bcrypt.compare hashes the password again with the salt stored inside the hash
    // and checks that both hashes match. The plain password is never stored.
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return { ok: false, reason: "INVALID_CREDENTIALS" };
    }

    if (!user.isActive) {
      return { ok: false, reason: "INACTIVE" };
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      return { ok: false, reason: "LOCKED" };
    }

    return { ok: true, user, roles: await AuthService.getRoleNames(user.id) };
  }

  static async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<{ user: User; roles: string[] }> {
    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }

    // bcrypt.hash generates a random salt and returns "$2b$12$<salt><hash>".
    const passwordHash = await bcrypt.hash(data.password, BCRYPT_ROUNDS);

    const user = await User.create({
      email: data.email,
      passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    // Link the new user to the STUDENT role (table user_roles), if that role exists.
    const role = await Role.findOne({ where: { name: DEFAULT_ROLE } });
    if (role) {
      await UserRole.create({ userId: user.id, roleId: role.id });
      return { user, roles: [role.name] };
    }

    return { user, roles: [] };
  }

  static async getRoleNames(userId: number): Promise<string[]> {
    // user_roles is the N:M table between users and roles.
    const links = await UserRole.findAll({ where: { userId } });
    if (links.length === 0) return [];

    const roles = await Role.findAll({ where: { id: links.map((link) => link.roleId) } });
    return roles.map((role) => role.name);
  }

  static generateToken(userId: number, roles: string[]): string {
    if (!env.JWT_SECRET) {
      throw new Error("JWT_SECRET no está configurado");
    }

    // The token carries: sub (user id), roles, iat (issued at), exp (expiry), iss and aud.
    return jwt.sign({ roles }, env.JWT_SECRET, {
      algorithm: "HS256",
      subject: String(userId),
      expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });
  }

  // Seconds the token lives, read back from the token itself so it always matches JWT_EXPIRES_IN.
  static getExpiresIn(token: string): number | undefined {
    const decoded = jwt.decode(token);
    if (decoded && typeof decoded !== "string" && decoded.exp && decoded.iat) {
      return decoded.exp - decoded.iat;
    }
    return undefined;
  }
}
