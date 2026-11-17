import { apiFetch } from '../../../services/api'

import type {
    Consent,
    ConsentPayload,
} from '../types/consent'

export const consentService = {
    getAll() {
        return apiFetch<Consent[]>('/consents')
    },
    getById(id: number) {
        return apiFetch<Consent>(`/consents/${id}`)
    },
    create(payload: ConsentPayload) {
        return apiFetch<Consent>('/consents', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    update(id: number, payload: ConsentPayload) {
        return apiFetch<Consent>(`/consents/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },
    remove(id: number) {
        return apiFetch<void>(`/consents/${id}`, {
            method: 'DELETE',
        })
    },
}
