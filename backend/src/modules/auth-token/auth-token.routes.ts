import { Router } from 'express';
import { AuthTokenController } from './auth-token.controller.js';
import { bearerAuth } from '../../middlewares/bearer-auth-middleware.js';
import { authorize } from '../rbac/authorize.middleware.js';

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get('/', authorize('auth-token:read'), AuthTokenController.getAll);

router.get('/:id', authorize('auth-token:read'), AuthTokenController.getById);

router.post('/', authorize('auth-token:create'), AuthTokenController.create);

router.put('/:id', authorize('auth-token:update'), AuthTokenController.update);

router.delete('/:id', authorize('auth-token:delete'), AuthTokenController.delete);

export default router;