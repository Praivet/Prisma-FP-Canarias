import { Router } from "express";
import { StudentController } from "./student.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get("/", authorize("student:read"), StudentController.getAll);

// Eager endpoint: GET /:id/eagerly returns the entity with its associations.
router.get("/:id/eagerly", authorize("student:read"), StudentController.getEagerlyById);

// Rutas con un texto fijo ("search", "eagerly") antes de "/:id", para que Express no las tome como un id.
router.get("/search/:lastNameSearch", authorize("student:read"), StudentController.getAllByLastNameWithEnrollments);

router.get("/eagerly/skill/:skillName", authorize("student:read"), StudentController.getAllEagerlyBySkillName);

router.get("/born-after/:date", authorize("student:read"), StudentController.getAllBornAfter);

router.get("/enrolled/level/:level", authorize("student:read"), StudentController.getAllEnrolledByProgramLevel);

router.get("/eagerly/skills-level/:level", authorize("student:read"), StudentController.getAllWithSkillsAtLevel);

router.get("/eagerly/skills-interests", authorize("student:read"), StudentController.getAllWithSkillsAndInterests);

router.get("/:id/user", authorize("student:read"), StudentController.getWithUserById);

router.get("/:id", authorize("student:read"), StudentController.getById);

router.post("/", authorize("student:create"), StudentController.create);

router.put("/:id", authorize("student:update"), StudentController.update);

router.delete("/:id", authorize("student:delete"), StudentController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
