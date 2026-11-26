import { Router } from 'express';
import { UserRoleController } from './user-role.controller.js';
import { bearerAuth } from '../../middlewares/bearer-auth-middleware.js';
import { authorize } from './authorize.middleware.js';

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get('/', authorize('user-role:read'), UserRoleController.getAll);

router.get('/:userId/:roleId', authorize('user-role:read'), UserRoleController.getById);

router.post('/', authorize('user-role:create'), UserRoleController.create);

router.put('/:userId/:roleId', authorize('user-role:update'), UserRoleController.update);

router.delete('/:userId/:roleId', authorize('user-role:delete'), UserRoleController.delete);

export default router;