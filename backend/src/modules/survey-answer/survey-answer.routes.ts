import { Router } from "express";
import { SurveyAnswerController } from "./survey-answer.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";
const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get("/", authorize("survey-answer:read"), SurveyAnswerController.getAll);
router.get("/:id", authorize("survey-answer:read"), SurveyAnswerController.getById);
router.post("/", authorize("survey-answer:create"), SurveyAnswerController.create);
router.put("/:id", authorize("survey-answer:update"), SurveyAnswerController.update);
router.delete("/:id", authorize("survey-answer:delete"), SurveyAnswerController.delete);
export default router;
