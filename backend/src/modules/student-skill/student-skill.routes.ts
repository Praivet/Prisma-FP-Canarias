import { Router } from "express";
import { StudentSkillController } from "./student-skill.controller";

const router = Router();

router.get("/", StudentSkillController.getAll);

// Specific routes go before "/:studentId/:skillId" so "student" is not taken as an id.
router.get("/student/:studentId", StudentSkillController.getByStudentId);

// Composite PK: one row is identified by both ids.
router.get("/:studentId/:skillId", StudentSkillController.getById);

router.post("/", StudentSkillController.create);

router.put("/:studentId/:skillId", StudentSkillController.update);

router.delete("/:studentId/:skillId", StudentSkillController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
