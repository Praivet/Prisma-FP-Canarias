import { Router } from 'express';
import { AuthTokenController } from './auth-token.controller.js';
import { bearerAuth } from '../../middlewares/bearer-auth-middleware.js';

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

router.get('/', AuthTokenController.getAll);

router.get('/:id', AuthTokenController.getById);

router.post('/', AuthTokenController.create);

router.put('/:id', AuthTokenController.update);

router.delete('/:id', AuthTokenController.delete);

export default router;