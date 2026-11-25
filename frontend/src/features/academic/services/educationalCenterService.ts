import { apiFetch } from '../../../services/api.js'

import type {
    EducationalCenter,
    EducationalCenterPayload,
} from '../types/educationalCenter'

export const educationalCenterService = {
    getAll() {
        return apiFetch<EducationalCenter[]>('/educational-centers')
    },
    getById(id: number) {
        return apiFetch<EducationalCenter>(
            `/educational-centers/${id}`
        )
    },
    create(payload: EducationalCenterPayload) {
        return apiFetch<EducationalCenter>('/educational-centers', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    update(id: number, payload: EducationalCenterPayload) {
        return apiFetch<EducationalCenter>(
            `/educational-centers/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify(payload),
            }
        )
    },
    remove(id: number) {
        return apiFetch<void>(`/educational-centers/${id}`, {
            method: 'DELETE',
        })
    },
}