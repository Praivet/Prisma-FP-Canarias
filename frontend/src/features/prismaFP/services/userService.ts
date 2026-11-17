import { apiFetch } from '../../../services/api'

import type { User, UserPayload } from '../types/user.js'

export const userService = {
    getAll() {
        return apiFetch<User[]>('/users')
    },
    getById(id: number) {
        return apiFetch<User>(`/users/${id}`)
    },
    create(payload: UserPayload) {
        return apiFetch<User>('/users', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    update(id: number, payload: UserPayload) {
        return apiFetch<User>(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },
    remove(id: number) {
        return apiFetch<void>(`/users/${id}`, {
            method: 'DELETE',
        })
    },
}