import { Router } from "express";
import { TutorAssignmentController } from "./tutor-assignament.controller.js";

const router = Router();

router.get("/", TutorAssignmentController.getAll);

// Specific routes go before "/:id" so Express does not take "eagerly" as an id.
router.get("/eagerly", TutorAssignmentController.getAllEagerly);

router.get("/tutor/:tutorId", TutorAssignmentController.getByTutorId);

router.get("/:id", TutorAssignmentController.getById);

router.post("/", TutorAssignmentController.create);

router.put("/:id", TutorAssignmentController.update);

router.delete("/:id", TutorAssignmentController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
