import { Router } from "express";
import { TutorAssignmentController } from "./tutor-assignament.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get("/", authorize("tutor-assignment:read"), TutorAssignmentController.getAll);

// Specific routes go before "/:id" so Express does not take "eagerly" as an id.
router.get("/eagerly", authorize("tutor-assignment:read"), TutorAssignmentController.getAllEagerly);

router.get("/eagerly/tutor-email/:email", authorize("tutor-assignment:read"), TutorAssignmentController.getAllByTutorEmail);

router.get("/tutor/:tutorId", authorize("tutor-assignment:read"), TutorAssignmentController.getByTutorId);

router.get("/:id", authorize("tutor-assignment:read"), TutorAssignmentController.getById);

router.post("/", authorize("tutor-assignment:create"), TutorAssignmentController.create);

router.put("/:id", authorize("tutor-assignment:update"), TutorAssignmentController.update);

router.delete("/:id", authorize("tutor-assignment:delete"), TutorAssignmentController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
