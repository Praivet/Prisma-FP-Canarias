import { apiFetch } from '../../../services/api'

import type {
    ProfessionalFamily,
    ProfessionalFamilyPayload,
} from '../types/professionalFamily'

export const professionalFamilyService = {
    getAll() {
        return apiFetch<ProfessionalFamily[]>('/professional-families')
    },
    getById(id: number) {
        return apiFetch<ProfessionalFamily>(
            `/professional-families/${id}`
        )
    },
    create(payload: ProfessionalFamilyPayload) {
        return apiFetch<ProfessionalFamily>('/professional-families', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    update(id: number, payload: ProfessionalFamilyPayload) {
        return apiFetch<ProfessionalFamily>(
            `/professional-families/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify(payload),
            }
        )
    },
    remove(id: number) {
        return apiFetch<void>(
            `/professional-families/${id}`,
            {
                method: 'DELETE',
            }
        )
    },
}