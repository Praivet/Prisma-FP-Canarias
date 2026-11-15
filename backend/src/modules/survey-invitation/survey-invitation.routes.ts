import { Router } from "express";
import { SurveyInvitationController } from "./survey-invitation.controller.js";
const router = Router();
router.get("/", SurveyInvitationController.getAll);
router.get("/:id", SurveyInvitationController.getById);
router.post("/", SurveyInvitationController.create);
router.put("/:id", SurveyInvitationController.update);
router.delete("/:id", SurveyInvitationController.delete);
export default router;
