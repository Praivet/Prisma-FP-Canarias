import { Router } from 'express';
import { ProfessionalFamilyController } from './professional-family.controller.js';
import { bearerAuth } from '../../middlewares/bearer-auth-middleware.js';
import { authorize } from '../rbac/authorize.middleware.js';

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get('/', authorize('professional-family:read'), ProfessionalFamilyController.getAll);

router.get('/:id', authorize('professional-family:read'), ProfessionalFamilyController.getById);

router.post('/', authorize('professional-family:create'), ProfessionalFamilyController.create);

router.put('/:id', authorize('professional-family:update'), ProfessionalFamilyController.update);

router.delete('/:id', authorize('professional-family:delete'), ProfessionalFamilyController.delete);

export default router;