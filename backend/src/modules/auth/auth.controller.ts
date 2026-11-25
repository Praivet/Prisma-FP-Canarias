import type { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service.js";
import type { User } from "../user/user.model.js";

// What we send back about the user. Never the passwordHash.
function publicUser(user: User, roles: string[]) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    roles,
  };
}

function tokenResponse(message: string, user: User, roles: string[]) {
  const token = AuthService.generateToken(user.id, roles);
  return {
    message,
    token,
    tokenType: "Bearer",
    expiresIn: AuthService.getExpiresIn(token),
    user: publicUser(user, roles),
  };
}

export class AuthController {
  // POST /api/auth/login   (Authorization: Basic base64(email:password))
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      // Put here by extractBasicAuthHeader.
      const { email, password } = res.locals.authUser;

      const result = await AuthService.validateCredentials(email, password);

      if (!result.ok) {
        if (result.reason === "INACTIVE") {
          res.status(403).json({ message: "La cuenta está desactivada" });
          return;
        }
        if (result.reason === "LOCKED") {
          res.status(423).json({ message: "La cuenta está bloqueada temporalmente" });
          return;
        }
        // Same message whether the email or the password is wrong, so nobody can find out which emails exist.
        res.setHeader("WWW-Authenticate", 'Basic realm="Prisma FP API"');
        res.status(401).json({ message: "Credenciales no válidas" });
        return;
      }

      res.status(200).json(tokenResponse("Login correcto", result.user, result.roles));
    } catch (error) {
      next(error);
    }
  }

  // POST /api/auth/register   (Authorization: Basic base64(email:password), body: { firstName, lastName })
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = res.locals.authUser;
      const { firstName, lastName } = req.body ?? {};

      if (!firstName || !lastName) {
        res.status(400).json({ message: "firstName y lastName son obligatorios" });
        return;
      }

      if (String(password).length < 8) {
        res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres" });
        return;
      }

      const { user, roles } = await AuthService.register({ email, password, firstName, lastName });

      res.status(201).json(tokenResponse("Usuario registrado", user, roles));
    } catch (error) {
      if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
        res.status(409).json({ message: "Ya existe un usuario con ese email" });
        return;
      }
      next(error);
    }
  }

  // GET /api/auth/me   (Authorization: Bearer <token>) -> who am I, according to my token.
  static async me(req: Request, res: Response) {
    res.json(res.locals.user);
  }
}
