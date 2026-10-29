import { Router } from "express";
import { SurveyAnswerController } from "./survey-answer.controller.js";
const router = Router();
router.get("/", SurveyAnswerController.getAll);
router.get("/:id", SurveyAnswerController.getById);
router.post("/", SurveyAnswerController.create);
router.put("/:id", SurveyAnswerController.update);
router.delete("/:id", SurveyAnswerController.delete);
export default router;
