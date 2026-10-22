import { Router } from "express";
import { EmploymentRecordController } from "./employment-record.controller.js";
const router = Router();
router.get("/", EmploymentRecordController.getAll);
router.get("/:id", EmploymentRecordController.getById);
router.post("/", EmploymentRecordController.create);
router.put("/:id", EmploymentRecordController.update);
router.delete("/:id", EmploymentRecordController.delete);
export default router;
