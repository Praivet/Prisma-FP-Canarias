import { apiFetch } from '../../../services/api'

import type { Role, RolePayload } from '../types/role.js'

export const roleService = {
    getAll() {
        return apiFetch<Role[]>('/roles')
    },
    getById(id: number) {
        return apiFetch<Role>(`/roles/${id}`)
    },
    create(payload: RolePayload) {
        return apiFetch<Role>('/roles', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    update(id: number, payload: RolePayload) {
        return apiFetch<Role>(`/roles/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },
    remove(id: number) {
        return apiFetch<void>(`/roles/${id}`, {
            method: 'DELETE',
        })
    },
}