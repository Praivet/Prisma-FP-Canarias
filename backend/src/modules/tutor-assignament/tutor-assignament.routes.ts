import { Router } from "express";
import { TutorAssignmentController } from "./tutor-assignament.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

router.get("/", TutorAssignmentController.getAll);

// Specific routes go before "/:id" so Express does not take "eagerly" as an id.
router.get("/eagerly", TutorAssignmentController.getAllEagerly);

router.get("/eagerly/tutor-email/:email", TutorAssignmentController.getAllByTutorEmail);

router.get("/tutor/:tutorId", TutorAssignmentController.getByTutorId);

router.get("/:id", TutorAssignmentController.getById);

router.post("/", TutorAssignmentController.create);

router.put("/:id", TutorAssignmentController.update);

router.delete("/:id", TutorAssignmentController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
