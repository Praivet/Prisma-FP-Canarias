import { apiFetch } from '../../../services/api'

import type {
    Company,
    CompanyPayload,
} from '../types/company'

function toFormData(payload: CompanyPayload){
    const form = new FormData()
    form.set('taxId', payload.taxId)
    form.set('name', payload.name)
    form.set('sector', payload.sector ?? '')
    form.set('city', payload.city ?? '')
    form.set('contactEmail', payload.contactEmail ?? '')
    form.set('contactPhone', payload.contactPhone ?? '')
    if (payload.image) form.set('image', payload.image)
    return form
}

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
