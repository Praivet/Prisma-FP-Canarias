import { Router } from "express";
import { StudentEnrollmentController } from "./student-enrollment.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

router.get("/", StudentEnrollmentController.getAll);

// Specific routes go before "/:id" so Express does not take "eagerly" as an id.
router.get("/eagerly", StudentEnrollmentController.getAllEagerly);

router.get("/eagerly/student-program", StudentEnrollmentController.getAllWithStudentAndProgram);

router.get("/before/:date", StudentEnrollmentController.getAllBefore);

router.get("/status/:status", StudentEnrollmentController.getAllByStatus);

router.get("/between/:from/:to", StudentEnrollmentController.getAllBetween);

router.get("/with-notes", StudentEnrollmentController.getAllWithNotes);

router.get("/eagerly/academic-year/:academicYearName", StudentEnrollmentController.getAllEagerlyByAcademicYearName);

router.get("/student/:studentId", StudentEnrollmentController.getByStudentId);

router.get("/:id", StudentEnrollmentController.getById);

router.post("/", StudentEnrollmentController.create);

router.put("/:id", StudentEnrollmentController.update);

router.delete("/:id", StudentEnrollmentController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
