import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { extractBasicAuthHeader } from "../../middlewares/basic-auth-middleware.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";

const router = Router();

// Basic Auth only here: email:password travel just when logging in or signing up.
router.post("/login", extractBasicAuthHeader, AuthController.login);

router.post("/register", extractBasicAuthHeader, AuthController.register);

// From here on the client uses the Bearer token it got above.
router.get("/me", bearerAuth, AuthController.me);

export default router;
