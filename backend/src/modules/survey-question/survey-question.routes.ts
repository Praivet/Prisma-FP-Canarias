import { Router } from "express";
import { SurveyQuestionController } from "./survey-question.controller.js";
const router = Router();
router.get("/", SurveyQuestionController.getAll);
router.get("/:id", SurveyQuestionController.getById);
router.post("/", SurveyQuestionController.create);
router.put("/:id", SurveyQuestionController.update);
router.delete("/:id", SurveyQuestionController.delete);
export default router;
