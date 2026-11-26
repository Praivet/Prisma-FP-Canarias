import { Router } from "express";
import { SurveyController } from "./survey.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";
const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get("/", authorize("survey:read"), SurveyController.getAll);
router.get("/:id", authorize("survey:read"), SurveyController.getById);
router.post("/", authorize("survey:create"), SurveyController.create);
router.put("/:id", authorize("survey:update"), SurveyController.update);
router.delete("/:id", authorize("survey:delete"), SurveyController.delete);
export default router;
