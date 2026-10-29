import { Router } from "express";
import { TrainingProgramController } from "./training-program.controller.js";

const router = Router();

router.get("/", TrainingProgramController.getAll);

// Eager endpoint: GET /:id/eagerly returns the entity with its associations.
router.get("/:id/eagerly", TrainingProgramController.getEagerlyById);

router.get("/:id", TrainingProgramController.getById);

router.post("/", TrainingProgramController.create);

router.put("/:id", TrainingProgramController.update);

router.delete("/:id", TrainingProgramController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
