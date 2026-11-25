import { Router } from "express";
import { StudentController } from "./student.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

router.get("/", StudentController.getAll);

// Eager endpoint: GET /:id/eagerly returns the entity with its associations.
router.get("/:id/eagerly", StudentController.getEagerlyById);

// Rutas con un texto fijo ("search", "eagerly") antes de "/:id", para que Express no las tome como un id.
router.get("/search/:lastNameSearch", StudentController.getAllByLastNameWithEnrollments);

router.get("/eagerly/skill/:skillName", StudentController.getAllEagerlyBySkillName);

router.get("/born-after/:date", StudentController.getAllBornAfter);

router.get("/enrolled/level/:level", StudentController.getAllEnrolledByProgramLevel);

router.get("/eagerly/skills-level/:level", StudentController.getAllWithSkillsAtLevel);

router.get("/eagerly/skills-interests", StudentController.getAllWithSkillsAndInterests);

router.get("/:id/user", StudentController.getWithUserById);

router.get("/:id", StudentController.getById);

router.post("/", StudentController.create);

router.put("/:id", StudentController.update);

router.delete("/:id", StudentController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
