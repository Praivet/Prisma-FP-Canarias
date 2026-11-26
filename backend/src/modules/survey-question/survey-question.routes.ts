import { Router } from "express";
import { SurveyQuestionController } from "./survey-question.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";
const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get("/", authorize("survey-question:read"), SurveyQuestionController.getAll);
router.get("/:id", authorize("survey-question:read"), SurveyQuestionController.getById);
router.post("/", authorize("survey-question:create"), SurveyQuestionController.create);
router.put("/:id", authorize("survey-question:update"), SurveyQuestionController.update);
router.delete("/:id", authorize("survey-question:delete"), SurveyQuestionController.delete);
export default router;
