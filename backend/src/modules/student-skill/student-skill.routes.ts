import { Router } from "express";
import { StudentSkillController } from "./student-skill.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get("/", authorize("student-skill:read"), StudentSkillController.getAll);

// Specific routes go before "/:studentId/:skillId" so "student" is not taken as an id.
router.get("/student/:studentId", authorize("student-skill:read"), StudentSkillController.getByStudentId);

// Composite PK: one row is identified by both ids.
router.get("/:studentId/:skillId", authorize("student-skill:read"), StudentSkillController.getById);

router.post("/", authorize("student-skill:create"), StudentSkillController.create);

router.put("/:studentId/:skillId", authorize("student-skill:update"), StudentSkillController.update);

router.delete("/:studentId/:skillId", authorize("student-skill:delete"), StudentSkillController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
