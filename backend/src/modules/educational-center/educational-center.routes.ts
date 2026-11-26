import { Router } from 'express';
import { EducationalCenterController } from './educational-center.controller.js';
import { bearerAuth } from '../../middlewares/bearer-auth-middleware.js';
import { authorize } from '../rbac/authorize.middleware.js';

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get('/', authorize('educational-center:read'), EducationalCenterController.getAll);

router.get('/:id', authorize('educational-center:read'), EducationalCenterController.getById);

router.post('/', authorize('educational-center:create'), EducationalCenterController.create);

router.put('/:id', authorize('educational-center:update'), EducationalCenterController.update);

router.delete('/:id', authorize('educational-center:delete'), EducationalCenterController.delete);

export default router;