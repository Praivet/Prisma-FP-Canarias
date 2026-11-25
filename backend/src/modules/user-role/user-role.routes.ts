import { Router } from 'express';
import { UserRoleController } from './user-role.controller.js';
import { bearerAuth } from '../../middlewares/bearer-auth-middleware.js';

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

router.get('/', UserRoleController.getAll);

router.get('/:userId/:roleId', UserRoleController.getById);

router.post('/', UserRoleController.create);

router.put('/:userId/:roleId', UserRoleController.update);

router.delete('/:userId/:roleId', UserRoleController.delete);

export default router;