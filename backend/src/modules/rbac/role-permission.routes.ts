import { Router } from 'express';
import { RolePermissionController } from './role-permission.controller.js';
import { bearerAuth } from '../../middlewares/bearer-auth-middleware.js';

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

router.get('/', RolePermissionController.getAll);

router.get('/:roleId/:permissionId', RolePermissionController.getById);

router.post('/', RolePermissionController.create);

router.delete('/:roleId/:permissionId', RolePermissionController.delete);

export default router;