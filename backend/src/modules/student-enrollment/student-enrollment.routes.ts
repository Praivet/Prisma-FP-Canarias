import { Router } from "express";
import { StudentEnrollmentController } from "./student-enrollment.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get("/", authorize("student-enrollment:read"), StudentEnrollmentController.getAll);

// Specific routes go before "/:id" so Express does not take "eagerly" as an id.
router.get("/eagerly", authorize("student-enrollment:read"), StudentEnrollmentController.getAllEagerly);

router.get("/eagerly/student-program", authorize("student-enrollment:read"), StudentEnrollmentController.getAllWithStudentAndProgram);

router.get("/before/:date", authorize("student-enrollment:read"), StudentEnrollmentController.getAllBefore);

router.get("/status/:status", authorize("student-enrollment:read"), StudentEnrollmentController.getAllByStatus);

router.get("/between/:from/:to", authorize("student-enrollment:read"), StudentEnrollmentController.getAllBetween);

router.get("/with-notes", authorize("student-enrollment:read"), StudentEnrollmentController.getAllWithNotes);

router.get("/eagerly/academic-year/:academicYearName", authorize("student-enrollment:read"), StudentEnrollmentController.getAllEagerlyByAcademicYearName);

router.get("/student/:studentId", authorize("student-enrollment:read"), StudentEnrollmentController.getByStudentId);

router.get("/:id", authorize("student-enrollment:read"), StudentEnrollmentController.getById);

router.post("/", authorize("student-enrollment:create"), StudentEnrollmentController.create);

router.put("/:id", authorize("student-enrollment:update"), StudentEnrollmentController.update);

router.delete("/:id", authorize("student-enrollment:delete"), StudentEnrollmentController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
