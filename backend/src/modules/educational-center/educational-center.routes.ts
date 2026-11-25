import { Router } from 'express';
import { EducationalCenterController } from './educational-center.controller.js';
import { bearerAuth } from '../../middlewares/bearer-auth.middleware.js';

const router = Router();

router.use(bearerAuth);

router.get('/', EducationalCenterController.getAll);

router.get('/:id', EducationalCenterController.getById);

router.post('/', EducationalCenterController.create);

router.put('/:id', EducationalCenterController.update);

router.delete('/:id', EducationalCenterController.delete);

export default router;