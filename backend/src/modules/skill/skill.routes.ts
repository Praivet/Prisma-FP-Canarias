import { Router } from "express";
import { SkillController } from "./skill.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

router.get("/", SkillController.getAll);

// Eager endpoint: GET /:id/eagerly returns the entity with its associations.
router.get("/:id/eagerly", SkillController.getEagerlyById);

router.get("/:id", SkillController.getById);

router.post("/", SkillController.create);

router.put("/:id", SkillController.update);

router.delete("/:id", SkillController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
