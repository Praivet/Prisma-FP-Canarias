import { Router } from "express";
import { ConsentRequestController } from "./consent-request.controller.js";
const router = Router();
router.get("/", ConsentRequestController.getAll);
router.get("/:id", ConsentRequestController.getById);
router.post("/", ConsentRequestController.create);
router.put("/:id", ConsentRequestController.update);
router.delete("/:id", ConsentRequestController.delete);
export default router;
