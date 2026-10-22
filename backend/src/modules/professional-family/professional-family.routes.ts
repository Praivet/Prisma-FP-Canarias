import { Router } from 'express';
import { ProfessionalFamilyController } from './professional-family.controller.js';

const router = Router();

router.get('/', ProfessionalFamilyController.getAll);

router.get('/:id', ProfessionalFamilyController.getById);

router.post('/', ProfessionalFamilyController.create);

router.put('/:id', ProfessionalFamilyController.update);

router.delete('/:id', ProfessionalFamilyController.delete);

export default router;