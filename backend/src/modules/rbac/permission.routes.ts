import { Router } from 'express';
import { PermissionController } from './permission.controller.js';
import { bearerAuth } from '../../middlewares/bearer-auth-middleware.js';
import { authorize } from './authorize.middleware.js';

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get('/', authorize('permission:read'), PermissionController.getAll);

router.get('/:id', authorize('permission:read'), PermissionController.getById);

router.post('/', authorize('permission:create'), PermissionController.create);

router.put('/:id', authorize('permission:update'), PermissionController.update);

router.delete('/:id', authorize('permission:delete'), PermissionController.delete);

export default router;