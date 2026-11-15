import { Router } from "express";
import { SurveyController } from "./survey.controller.js";
const router = Router();
router.get("/", SurveyController.getAll);
router.get("/:id", SurveyController.getById);
router.post("/", SurveyController.create);
router.put("/:id", SurveyController.update);
router.delete("/:id", SurveyController.delete);
export default router;
