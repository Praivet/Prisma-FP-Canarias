import { Router } from 'express';
import { UserRoleController } from './user-role.controller.js';

const router = Router();

router.get('/', UserRoleController.getAll);

router.get('/:userId/:roleId', UserRoleController.getById);

router.post('/', UserRoleController.create);

router.put('/:userId/:roleId', UserRoleController.update);

router.delete('/:userId/:roleId', UserRoleController.delete);

export default router;