import { Router } from "express";
import { TrainingProgramController } from "./training-program.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

router.get("/", TrainingProgramController.getAll);

// OJO: las rutas con texto fijo ("eagerly") van ANTES de "/:id". Si no, Express cree que "eagerly" es un id.
router.get("/eagerly/family-center", TrainingProgramController.getAllWithFamilyAndCenter);

// :familyCode en la ruta  <->  req.params.familyCode en el controller (mismo nombre).
router.get("/eagerly/family/:familyCode", TrainingProgramController.getAllByFamilyCode);

router.get("/:id/eagerly", TrainingProgramController.getEagerlyById);

router.get("/:id", TrainingProgramController.getById);

router.post("/", TrainingProgramController.create);

router.put("/:id", TrainingProgramController.update);

router.delete("/:id", TrainingProgramController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
