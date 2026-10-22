import { Router } from "express";
import { AcademicYearController } from "./academic-year.controller";

const router = Router();

router.get("/", AcademicYearController.getAll);

// Eager endpoint: GET /:id/eagerly returns the entity with its associations.
router.get("/:id/eagerly", AcademicYearController.getEagerlyById);

router.get("/:id", AcademicYearController.getById);

router.post("/", AcademicYearController.create);

router.put("/:id", AcademicYearController.update);

router.delete("/:id", AcademicYearController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
