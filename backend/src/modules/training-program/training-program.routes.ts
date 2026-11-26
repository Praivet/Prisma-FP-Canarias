import { Router } from "express";
import { TrainingProgramController } from "./training-program.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get("/", authorize("training-program:read"), TrainingProgramController.getAll);

// OJO: las rutas con texto fijo ("eagerly") van ANTES de "/:id". Si no, Express cree que "eagerly" es un id.
router.get("/eagerly/family-center", authorize("training-program:read"), TrainingProgramController.getAllWithFamilyAndCenter);

// :familyCode en la ruta  <->  req.params.familyCode en el controller (mismo nombre).
router.get("/eagerly/family/:familyCode", authorize("training-program:read"), TrainingProgramController.getAllByFamilyCode);

router.get("/:id/eagerly", authorize("training-program:read"), TrainingProgramController.getEagerlyById);

router.get("/:id", authorize("training-program:read"), TrainingProgramController.getById);

router.post("/", authorize("training-program:create"), TrainingProgramController.create);

router.put("/:id", authorize("training-program:update"), TrainingProgramController.update);

router.delete("/:id", authorize("training-program:delete"), TrainingProgramController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
