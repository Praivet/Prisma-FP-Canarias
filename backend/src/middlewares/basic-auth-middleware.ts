import type { Request, Response, NextFunction } from "express";

// Basic Auth: the client sends  Authorization: Basic base64(email:password)
// This middleware only extracts the credentials; checking them is the job of AuthService.
export function extractBasicAuthHeader(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const unauthorized = () => {
    res.setHeader("WWW-Authenticate", 'Basic realm="Prisma FP API"');
    res.status(401).json({ message: "Credenciales no válidas" });
  };

  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Basic ")) {
    unauthorized();
    return;
  }

  // "Basic dGlidXJjaW86bXlzZWNyZXQ=" -> "tiburcio:mysecret"
  const base64Credentials = authorization.slice("Basic ".length).trim();
  const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");

  // Split on the FIRST ":" only, so a password may contain ":".
  const separator = credentials.indexOf(":");
  if (separator === -1) {
    unauthorized();
    return;
  }

  const email = credentials.slice(0, separator).trim().toLowerCase();
  const password = credentials.slice(separator + 1);

  if (!email || !password) {
    unauthorized();
    return;
  }

  // res.locals lives only during this request: it is how middlewares pass data to the controller.
  res.locals.authUser = { email, password };

  next();
}
