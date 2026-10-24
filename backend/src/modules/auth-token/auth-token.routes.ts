import { Router } from 'express';
import { AuthTokenController } from './auth-token.controller.js';

const router = Router();

router.get('/', AuthTokenController.getAll);

router.get('/:id', AuthTokenController.getById);

router.post('/', AuthTokenController.create);

router.put('/:id', AuthTokenController.update);

router.delete('/:id', AuthTokenController.delete);

export default router;