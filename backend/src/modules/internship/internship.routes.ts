import { Router } from "express";
import { InternshipController } from "./internship.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";
const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get("/", authorize("internship:read"), InternshipController.getAll);
router.get("/:id", authorize("internship:read"), InternshipController.getById);
router.post("/", authorize("internship:create"), InternshipController.create);
router.put("/:id", authorize("internship:update"), InternshipController.update);
router.delete("/:id", authorize("internship:delete"), InternshipController.delete);
export default router;
