import { Router } from 'express';
import { RolePermissionController } from './role-permission.controller.js';
import { bearerAuth } from '../../middlewares/bearer-auth-middleware.js';
import { authorize } from './authorize.middleware.js';

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get('/', authorize('role-permission:read'), RolePermissionController.getAll);

router.get('/:roleId/:permissionId', authorize('role-permission:read'), RolePermissionController.getById);

router.post('/', authorize('role-permission:create'), RolePermissionController.create);

router.delete('/:roleId/:permissionId', authorize('role-permission:delete'), RolePermissionController.delete);

export default router;