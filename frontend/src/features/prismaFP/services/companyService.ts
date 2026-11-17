import { apiFetch } from '../../../services/api'

import type {
    Company,
    CompanyPayload,
} from '../types/company'

export const companyService = {
    getAll() {
        return apiFetch<Company[]>('/companies')
    },
    getById(id: number) {
        return apiFetch<Company>(`/companies/${id}`)
    },
    create(payload: CompanyPayload) {
        return apiFetch<Company>('/companies', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    update(id: number, payload: CompanyPayload) {
        return apiFetch<Company>(`/companies/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },
    remove(id: number) {
        return apiFetch<void>(`/companies/${id}`, {
            method: 'DELETE',
        })
    },
}
