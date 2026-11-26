import { Router } from "express";
import { SurveyInvitationController } from "./survey-invitation.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";
const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get("/", authorize("survey-invitation:read"), SurveyInvitationController.getAll);
router.get("/:id", authorize("survey-invitation:read"), SurveyInvitationController.getById);
router.post("/", authorize("survey-invitation:create"), SurveyInvitationController.create);
router.put("/:id", authorize("survey-invitation:update"), SurveyInvitationController.update);
router.delete("/:id", authorize("survey-invitation:delete"), SurveyInvitationController.delete);
export default router;
