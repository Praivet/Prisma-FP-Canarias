import { Router } from "express";
import { ConsentController } from "./consent.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";
const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get("/", authorize("consent:read"), ConsentController.getAll);
router.get("/:id", authorize("consent:read"), ConsentController.getById);
router.post("/", authorize("consent:create"), ConsentController.create);
router.put("/:id", authorize("consent:update"), ConsentController.update);
router.delete("/:id", authorize("consent:delete"), ConsentController.delete);
export default router;
