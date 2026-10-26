import { Router } from 'express';
import { AuditLogController } from './audit-log.controller.js';

const router = Router();

router.get('/', AuditLogController.getAll);

router.get('/:id', AuditLogController.getById);

router.post('/', AuditLogController.create);

router.put('/:id', AuditLogController.update);

router.delete('/:id', AuditLogController.delete);

export default router;