import { Router } from 'express';
import { EducationalCenterController } from './educational-center.controller.js';

const router = Router();

router.get('/', EducationalCenterController.getAll);

router.get('/:id', EducationalCenterController.getById);

router.post('/', EducationalCenterController.create);

router.put('/:id', EducationalCenterController.update);

router.delete('/:id', EducationalCenterController.delete);

export default router;