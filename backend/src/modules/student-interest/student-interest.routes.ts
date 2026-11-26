import { Router } from "express";
import { StudentInterestController } from "./student-interest.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get("/", authorize("student-interest:read"), StudentInterestController.getAll);

router.get("/search/:text", authorize("student-interest:read"), StudentInterestController.getAllByNameContaining);

// Specific routes go before "/:id".
router.get("/student/:studentId", authorize("student-interest:read"), StudentInterestController.getByStudentId);

router.get("/:id", authorize("student-interest:read"), StudentInterestController.getById);

router.post("/", authorize("student-interest:create"), StudentInterestController.create);

router.put("/:id", authorize("student-interest:update"), StudentInterestController.update);

router.delete("/:id", authorize("student-interest:delete"), StudentInterestController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
