import { Router } from "express";
import { AcademicYearController } from "./academic-year.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

router.get("/", AcademicYearController.getAll);

// Texto fijo ("active") antes de "/:id".
router.get("/active/eagerly", AcademicYearController.getActiveEagerly);

// Eager endpoint: GET /:id/eagerly returns the entity with its associations.
router.get("/:id/eagerly", AcademicYearController.getEagerlyById);

router.get("/:id", AcademicYearController.getById);

router.post("/", AcademicYearController.create);

router.put("/:id", AcademicYearController.update);

router.delete("/:id", AcademicYearController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
