import { Router } from 'express';
import { ProfessionalFamilyController } from './professional-family.controller.js';
import { bearerAuth } from '../../middlewares/bearer-auth-middleware.js';

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

router.get('/', ProfessionalFamilyController.getAll);

router.get('/:id', ProfessionalFamilyController.getById);

router.post('/', ProfessionalFamilyController.create);

router.put('/:id', ProfessionalFamilyController.update);

router.delete('/:id', ProfessionalFamilyController.delete);

export default router;