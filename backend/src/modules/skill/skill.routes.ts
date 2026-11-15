import { Router } from "express";
import { SkillController } from "./skill.controller.js";

const router = Router();

router.get("/", SkillController.getAll);

// OJO: rutas con texto fijo antes de "/:id".
router.get("/eagerly/status/:status/program/:programCode", SkillController.getAllByEnrollmentStatusAndProgramCode);

router.get("/category/:category", SkillController.getAllByCategory);

router.get("/:id/eagerly", SkillController.getEagerlyById);

router.get("/:id", SkillController.getById);

router.post("/", SkillController.create);

router.put("/:id", SkillController.update);

router.delete("/:id", SkillController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
