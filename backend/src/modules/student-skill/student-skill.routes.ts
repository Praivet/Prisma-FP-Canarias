import { Router } from "express";
import { StudentSkillController } from "./student-skill.controller";

const router = Router();

router.get("/", StudentSkillController.getAll);

// Specific routes go before "/:id".
router.get("/student/:studentId", StudentSkillController.getByStudentId);

router.get("/:id", StudentSkillController.getById);

router.post("/", StudentSkillController.create);

router.put("/:id", StudentSkillController.update);

router.delete("/:id", StudentSkillController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
