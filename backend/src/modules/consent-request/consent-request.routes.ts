import { Router } from "express";
import { ConsentRequestController } from "./consent-request.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";
const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get("/", authorize("consent-request:read"), ConsentRequestController.getAll);
router.get("/:id", authorize("consent-request:read"), ConsentRequestController.getById);
router.post("/", authorize("consent-request:create"), ConsentRequestController.create);
router.put("/:id", authorize("consent-request:update"), ConsentRequestController.update);
router.delete("/:id", authorize("consent-request:delete"), ConsentRequestController.delete);
export default router;
