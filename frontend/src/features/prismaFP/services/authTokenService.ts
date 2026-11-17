import { apiFetch } from '../../../services/api'

import type {
    AuthToken,
    AuthTokenPayload,
} from '../types/authToken.js'

export const authTokenService = {
    getAll() {
        return apiFetch<AuthToken[]>('/auth-tokens')
    },
    getById(id: number) {
        return apiFetch<AuthToken>(`/auth-tokens/${id}`)
    },
    create(payload: AuthTokenPayload) {
        return apiFetch<AuthToken>('/auth-tokens', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    remove(id: number) {
        return apiFetch<void>(`/auth-tokens/${id}`, {
            method: 'DELETE',
        })
    },
}