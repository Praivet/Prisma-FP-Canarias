import { Router } from 'express';
import { AuditLogController } from './audit-log.controller.js';
import { bearerAuth } from '../../middlewares/bearer-auth-middleware.js';
import { authorize } from '../rbac/authorize.middleware.js';

const router = Router();

// Every route of this module needs a valid Bearer token.
router.use(bearerAuth);

// Each route also checks the permission of the user's roles (table role_permissions): 403 if missing.

router.get('/', authorize('audit-log:read'), AuditLogController.getAll);

router.get('/:id', authorize('audit-log:read'), AuditLogController.getById);

router.post('/', authorize('audit-log:create'), AuditLogController.create);

router.put('/:id', authorize('audit-log:update'), AuditLogController.update);

router.delete('/:id', authorize('audit-log:delete'), AuditLogController.delete);

export default router;