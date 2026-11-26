import { Router } from 'express';
import { UserController } from './user.controller.js';
import { bearerAuth } from '../../middlewares/bearer-auth-middleware.js';
import { authorize } from '../rbac/authorize.middleware.js';

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get('/', authorize('user:read'), UserController.getAll);

router.get('/:id', authorize('user:read'), UserController.getById);

router.post('/', authorize('user:create'), UserController.create);

router.put('/:id', authorize('user:update'), UserController.update);

router.delete('/:id', authorize('user:delete'), UserController.delete);

export default router;