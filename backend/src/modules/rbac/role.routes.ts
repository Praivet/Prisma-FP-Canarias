import { Router } from 'express';
import { RoleController } from './role.controller.js';
import { bearerAuth } from '../../middlewares/bearer-auth-middleware.js';
import { authorize } from './authorize.middleware.js';

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get('/', authorize('role:read'), RoleController.getAll);

router.get('/:id', authorize('role:read'), RoleController.getById);

router.post('/', authorize('role:create'), RoleController.create);

router.put('/:id', authorize('role:update'), RoleController.update);

router.delete('/:id', authorize('role:delete'), RoleController.delete);

export default router;