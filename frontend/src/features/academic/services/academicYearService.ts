import { apiFetch } from '../../../services/api'

import type {
    AcademicYear,
    AcademicYearPayload,
} from '../types/academicYear'

export const academicYearService = {
    getAll() {
        return apiFetch<AcademicYear[]>('/academic-years')
    },
    getById(id: number) {
        return apiFetch<AcademicYear>(`/academic-years/${id}`)
    },
    create(payload: AcademicYearPayload) {
        return apiFetch<AcademicYear>('/academic-years', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    update(id: number, payload: AcademicYearPayload) {
        return apiFetch<AcademicYear>(`/academic-years/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },
    remove(id: number) {
        return apiFetch<void>(`/academic-years/${id}`, {
            method: 'DELETE',
        })
    },
}
