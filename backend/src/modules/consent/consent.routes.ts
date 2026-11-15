import { Router } from "express";
import { ConsentController } from "./consent.controller.js";
const router = Router();
router.get("/", ConsentController.getAll);
router.get("/:id", ConsentController.getById);
router.post("/", ConsentController.create);
router.put("/:id", ConsentController.update);
router.delete("/:id", ConsentController.delete);
export default router;
