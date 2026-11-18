import { apiFetch } from '../../../services/api'

import type {
    RolePermission,
    RolePermissionPayload,
} from '../types/rolePermission'

export const rolePermissionService = {
    getAll() {
        return apiFetch<RolePermission[]>('/role-permissions')
    },
    getById(roleId: number, permissionId: number) {
        return apiFetch<RolePermission>(
            `/role-permissions/${roleId}/${permissionId}`
        )
    },
    create(payload: RolePermissionPayload) {
        return apiFetch<RolePermission>('/role-permissions', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    remove(roleId: number, permissionId: number) {
        return apiFetch<void>(
            `/role-permissions/${roleId}/${permissionId}`,
            {
                method: 'DELETE',
            }
        )
    },
}