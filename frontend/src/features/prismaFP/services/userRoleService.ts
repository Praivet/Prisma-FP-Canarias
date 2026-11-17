import { apiFetch } from '../../../services/api'

import type {
    UserRole,
    UserRolePayload,
} from '../types/userRole.js'

export const userRoleService = {
    getAll() {
        return apiFetch<UserRole[]>('/user-roles')
    },
    getById(userId: number, roleId: number) {
        return apiFetch<UserRole>(
            `/user-roles/${userId}/${roleId}`
        )
    },
    create(payload: UserRolePayload) {
        return apiFetch<UserRole>('/user-roles', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    remove(userId: number, roleId: number) {
        return apiFetch<void>(
            `/user-roles/${userId}/${roleId}`,
            {
                method: 'DELETE',
            }
        )
    },
}