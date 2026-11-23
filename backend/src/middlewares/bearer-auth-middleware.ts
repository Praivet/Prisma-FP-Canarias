import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../modules/user/user.model.js";
import { JWT_AUDIENCE, JWT_ISSUER } from "../modules/auth/auth.service.js";

// Bearer Auth: the client sends  Authorization: Bearer <JWT obtained in /api/auth/login>
// If the token is valid and its user still exists, the request goes on to the controller.
export async function bearerAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.setHeader("WWW-Authenticate", 'Bearer realm="Prisma FP API"');
    res.status(401).json({ message: "Se requiere un token Bearer" });
    return;
  }

  const token = authorization.slice("Bearer ".length).trim();

  if (!env.JWT_SECRET) {
    next(new Error("JWT_SECRET no está configurado"));
    return;
  }

  try {
    // verify() checks the signature with our secret, the expiry (exp), the issuer and the audience.
    const payload = jwt.verify(token, env.JWT_SECRET, {
      algorithms: ["HS256"],
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });

    if (typeof payload === "string" || !payload.sub) {
      res.status(401).json({ message: "Token no válido" });
      return;
    }

    const user = await User.findByPk(Number(payload.sub));
    if (!user || !user.isActive) {
      res.status(401).json({ message: "Usuario no encontrado o inactivo" });
      return;
    }

    // Who is calling, for the controllers (and for role checks later on).
    res.locals.user = {
      id: user.id,
      email: user.email,
      roles: Array.isArray(payload.roles) ? payload.roles : [],
    };

    next();
  } catch (error) {
    // TokenExpiredError extends JsonWebTokenError, so this catches both.
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Token no válido o caducado" });
      return;
    }
    next(error);
  }
}
