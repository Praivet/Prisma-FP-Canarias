import { Router } from 'express';
import { AuditLogController } from './audit-log.controller.js';
import { bearerAuth } from '../../middlewares/bearer-auth-middleware.js';

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

router.get('/', AuditLogController.getAll);

router.get('/:id', AuditLogController.getById);

router.post('/', AuditLogController.create);

router.put('/:id', AuditLogController.update);

router.delete('/:id', AuditLogController.delete);

export default router;