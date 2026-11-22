import { Router } from "express";
import { ExamenAuditController } from "./examen-audit.controller.js";
const router = Router();
router.get("/", ExamenAuditController.getAll);
// Va antes de "/:id" para que Express no tome "operation" como un id
router.get("/operation/create", ExamenAuditController.getOperationCreate);
router.get("/:id", ExamenAuditController.getById);
router.post("/", ExamenAuditController.create);
router.put("/:id", ExamenAuditController.update);
router.delete("/:id", ExamenAuditController.delete);
export default router;
