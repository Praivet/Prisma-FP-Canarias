import { Router } from 'express';
import { RoleController } from './role.controller.js';
import { bearerAuth } from '../../middlewares/bearer-auth-middleware.js';

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

router.get('/', RoleController.getAll);

router.get('/:id', RoleController.getById);

router.post('/', RoleController.create);

router.put('/:id', RoleController.update);

router.delete('/:id', RoleController.delete);

export default router;