import { apiFetch } from '../../../services/api'

import type {
    StudentInterest,
    StudentInterestPayload,
} from '../types/studentInterest'

export const studentInterestService = {
    getAll() {
        return apiFetch<StudentInterest[]>('/student-interests')
    },
    getById(id: number) {
        return apiFetch<StudentInterest>(`/student-interests/${id}`)
    },
    create(payload: StudentInterestPayload) {
        return apiFetch<StudentInterest>('/student-interests', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    update(id: number, payload: StudentInterestPayload) {
        return apiFetch<StudentInterest>(`/student-interests/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },
    remove(id: number) {
        return apiFetch<void>(`/student-interests/${id}`, {
            method: 'DELETE',
        })
    },
}
