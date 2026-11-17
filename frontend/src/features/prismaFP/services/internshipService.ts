import { apiFetch } from '../../../services/api'

import type {
    Internship,
    InternshipPayload,
} from '../types/internship'

export const internshipService = {
    getAll() {
        return apiFetch<Internship[]>('/internships')
    },
    getById(id: number) {
        return apiFetch<Internship>(`/internships/${id}`)
    },
    create(payload: InternshipPayload) {
        return apiFetch<Internship>('/internships', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    update(id: number, payload: InternshipPayload) {
        return apiFetch<Internship>(`/internships/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },
    remove(id: number) {
        return apiFetch<void>(`/internships/${id}`, {
            method: 'DELETE',
        })
    },
}
