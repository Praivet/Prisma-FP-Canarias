import { Router } from 'express';
import { RolePermissionController } from './role-permission.controller.js';

const router = Router();

router.get('/', RolePermissionController.getAll);

router.get('/:roleId/:permissionId', RolePermissionController.getById);

router.post('/', RolePermissionController.create);

router.delete('/:roleId/:permissionId', RolePermissionController.delete);

export default router;