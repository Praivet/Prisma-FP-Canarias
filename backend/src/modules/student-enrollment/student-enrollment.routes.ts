import { Router } from "express";
import { StudentEnrollmentController } from "./student-enrollment.controller.js";

const router = Router();

router.get("/", StudentEnrollmentController.getAll);

// Specific routes go before "/:id" so Express does not take "eagerly" as an id.
router.get("/eagerly", StudentEnrollmentController.getAllEagerly);

router.get("/student/:studentId", StudentEnrollmentController.getByStudentId);

router.get("/:id", StudentEnrollmentController.getById);

router.post("/", StudentEnrollmentController.create);

router.put("/:id", StudentEnrollmentController.update);

router.delete("/:id", StudentEnrollmentController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
