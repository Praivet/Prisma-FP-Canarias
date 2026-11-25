import { apiFetch } from '../../../services/api'

import type {
    ConsentRequest,
    ConsentRequestPayload,
} from '../types/consentRequest'

export const consentRequestService = {
    getAll() {
        return apiFetch<ConsentRequest[]>('/consent-requests')
    },
    getById(id: number) {
        return apiFetch<ConsentRequest>(`/consent-requests/${id}`)
    },
    create(payload: ConsentRequestPayload) {
        return apiFetch<ConsentRequest>('/consent-requests', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    update(id: number, payload: ConsentRequestPayload) {
        return apiFetch<ConsentRequest>(`/consent-requests/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },
    remove(id: number) {
        return apiFetch<void>(`/consent-requests/${id}`, {
            method: 'DELETE',
        })
    },
}
