import { Router } from "express";
import userRoutes from "../../src/modules/user/user.routes";
import roleRoutes from "../../src/modules/role/role.routes";
import permissionRoutes from "../../src/modules/permission/permission.routes";
import userRoleRoutes from "../../src/modules/user-role/user-role.routes";
import rolePermissionRoutes from "../../src/modules/role-permission/role-permission.routes";
import authTokenRoutes from "../../src/modules/auth-token/auth-token.routes";
import auditLogRoutes from "../../src/modules/audit-log/audit-log.routes";
import educationalCenterRoutes from "../../src/modules/educational-center/educational-center.routes";
import professionalFamilyRoutes from "../../src/modules/professional-family/professional-family.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);
router.use("/user-roles", userRoleRoutes);
router.use("/role-permissions", rolePermissionRoutes);
router.use("/auth-tokens", authTokenRoutes);
router.use("/audit-logs", auditLogRoutes);
router.use("/educational-centers", educationalCenterRoutes);
router.use("/professional-families", professionalFamilyRoutes);

export default router;