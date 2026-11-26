import { Router } from "express";
import { SkillController } from "./skill.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get("/", authorize("skill:read"), SkillController.getAll);

// OJO: rutas con texto fijo antes de "/:id".
router.get("/eagerly/status/:status/program/:programCode", authorize("skill:read"), SkillController.getAllByEnrollmentStatusAndProgramCode);

router.get("/category/:category", authorize("skill:read"), SkillController.getAllByCategory);

router.get("/:id/eagerly", authorize("skill:read"), SkillController.getEagerlyById);

router.get("/:id", authorize("skill:read"), SkillController.getById);

router.post("/", authorize("skill:create"), SkillController.create);

router.put("/:id", authorize("skill:update"), SkillController.update);

router.delete("/:id", authorize("skill:delete"), SkillController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
