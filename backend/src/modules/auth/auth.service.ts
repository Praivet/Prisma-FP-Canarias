import bcrypt from "bcryptjs";
import { User } from "../user/user.model.js";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { sequelize } from "../../config/database.js";
import { Role } from "../role/role.model.js";
import { UserRole } from "../user-role/user-role.model.js";

export class AuthService {

  static async validateCredentials(
    email: string,
    password: string
  ): Promise<User | null> {

    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return null;
    }

    const validPassword = await bcrypt.compare(
      password,
      String(user.passwordHash)
    );

    if (!validPassword) {
      return null;
    }

    return user;
  }

  static async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<User> {
    return sequelize.transaction(async (transaction) => {
      const existingUser = await User.findOne({ where: { email }, transaction });

      if (existingUser) throw new Error("USERNAME_ALREADY_EXISTS");

      const passwordHash = await bcrypt.hash(password, 12);

      const customerRole = await Role.findOne({
        where: { name: "STUDENT" },
        transaction
      });

      if (!customerRole) throw new Error("STUDENT role not found");

      const user = await User.create({ email, passwordHash, firstName, lastName }, { transaction });

      await UserRole.create({ userId: user.id, roleId: customerRole.id }, { transaction });

      return user;
    });
  }

  static async generateToken(userId: number): Promise<string | null> {
    const secret = env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not configured");

    const token = jwt.sign({}, secret, {
      algorithm: "HS256",
      subject: String(userId),
      expiresIn: "1h",
      issuer: "bicycle-shop-api",
      audience: "bicycle-shop-client"
    });

    return token;
  }
}
