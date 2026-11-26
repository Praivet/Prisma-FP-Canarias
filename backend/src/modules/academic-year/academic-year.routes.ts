import { Router } from "express";
import { AcademicYearController } from "./academic-year.controller.js";
import { bearerAuth } from "../../middlewares/bearer-auth-middleware.js";
import { authorize } from "../rbac/authorize.middleware.js";

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get("/", authorize("academic-year:read"), AcademicYearController.getAll);

// Texto fijo ("active") antes de "/:id".
router.get("/active/eagerly", authorize("academic-year:read"), AcademicYearController.getActiveEagerly);

// Eager endpoint: GET /:id/eagerly returns the entity with its associations.
router.get("/:id/eagerly", authorize("academic-year:read"), AcademicYearController.getEagerlyById);

router.get("/:id", authorize("academic-year:read"), AcademicYearController.getById);

router.post("/", authorize("academic-year:create"), AcademicYearController.create);

router.put("/:id", authorize("academic-year:update"), AcademicYearController.update);

router.delete("/:id", authorize("academic-year:delete"), AcademicYearController.delete);

// Do not forget the default export: index.ts imports it and breaks if it is missing.
export default router;
