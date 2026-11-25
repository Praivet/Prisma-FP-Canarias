import { apiFetch } from '../../../services/api'

import type {
    Permission,
    PermissionPayload,
} from '../types/permission.js'

export const permissionService = {
    getAll() {
        return apiFetch<Permission[]>('/permissions')
    },
    getById(id: number) {
        return apiFetch<Permission>(`/permissions/${id}`)
    },
    create(payload: PermissionPayload) {
        return apiFetch<Permission>('/permissions', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    update(id: number, payload: PermissionPayload) {
        return apiFetch<Permission>(`/permissions/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },
    remove(id: number) {
        return apiFetch<void>(`/permissions/${id}`, {
            method: 'DELETE',
        })
    },
}