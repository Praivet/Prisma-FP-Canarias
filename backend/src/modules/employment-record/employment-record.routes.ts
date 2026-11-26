import { Router } from "express";
import { EmploymentRecordController } from "./employment-record.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";
const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get("/", authorize("employment-record:read"), EmploymentRecordController.getAll);
router.get("/:id", authorize("employment-record:read"), EmploymentRecordController.getById);
router.post("/", authorize("employment-record:create"), EmploymentRecordController.create);
router.put("/:id", authorize("employment-record:update"), EmploymentRecordController.update);
router.delete("/:id", authorize("employment-record:delete"), EmploymentRecordController.delete);
export default router;
