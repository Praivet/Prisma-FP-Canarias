import { apiFetch } from '../../../services/api'

import type {
    AuditLog,
    AuditLogPayload,
} from '../types/auditLog.js'

export const auditLogService = {
    getAll() {
        return apiFetch<AuditLog[]>('/audit-logs')
    },
    getById(id: number) {
        return apiFetch<AuditLog>(`/audit-logs/${id}`)
    },
    create(payload: AuditLogPayload) {
        return apiFetch<AuditLog>('/audit-logs', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
}