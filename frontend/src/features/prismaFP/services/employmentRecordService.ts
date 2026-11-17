import { apiFetch } from '../../../services/api'

import type {
    EmploymentRecord,
    EmploymentRecordPayload,
} from '../types/employmentRecord'

export const employmentRecordService = {
    getAll() {
        return apiFetch<EmploymentRecord[]>('/employment-records')
    },
    getById(id: number) {
        return apiFetch<EmploymentRecord>(`/employment-records/${id}`)
    },
    create(payload: EmploymentRecordPayload) {
        return apiFetch<EmploymentRecord>('/employment-records', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    update(id: number, payload: EmploymentRecordPayload) {
        return apiFetch<EmploymentRecord>(`/employment-records/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },
    remove(id: number) {
        return apiFetch<void>(`/employment-records/${id}`, {
            method: 'DELETE',
        })
    },
}
