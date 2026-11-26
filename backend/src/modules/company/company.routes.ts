import { Router } from "express";
import { CompanyController } from "./company.controller.js";
import { upload } from "../../middlewares/upload.middleware.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";
const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get("/", authorize("company:read"), CompanyController.getAll);
router.get("/:id", authorize("company:read"), CompanyController.getById);
router.post("/", authorize("company:create"), upload.single("image"), CompanyController.create);
router.put("/:id", authorize("company:update"), upload.single("image"), CompanyController.update);
router.delete("/:id", authorize("company:delete"), CompanyController.delete);
export default router;
