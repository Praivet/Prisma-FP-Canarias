import { Router } from "express";
import { StudentInterestController } from "./student-interest.controller";

const router = Router();

router.get("/", StudentInterestController.getAll);

// Specific routes go before "/:id".
router.get("/student/:studentId", StudentInterestController.getByStudentId);

router.get("/:id", StudentInterestController.getById);

router.post("/", StudentInterestController.create);

router.put("/:id", StudentInterestController.update);

router.delete("/:id", StudentInterestController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
