import { Router } from "express";
import { StudentController } from "./student.controller.js";

const router = Router();

router.get("/", StudentController.getAll);

// Eager endpoint: GET /:id/eagerly returns the entity with its associations.
router.get("/:id/eagerly", StudentController.getEagerlyById);

router.get("/:id", StudentController.getById);

router.post("/", StudentController.create);

router.put("/:id", StudentController.update);

router.delete("/:id", StudentController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
