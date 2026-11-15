import { apiFetch } from '../../../services/api'

import type {
    StudentEnrollment,
    StudentEnrollmentPayload,
} from '../types/studentEnrollment'

export const studentEnrollmentService = {
    getAll() {
        return apiFetch<StudentEnrollment[]>('/student-enrollments')
    },
    getById(id: number) {
        return apiFetch<StudentEnrollment>(`/student-enrollments/${id}`)
    },
    create(payload: StudentEnrollmentPayload) {
        return apiFetch<StudentEnrollment>('/student-enrollments', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    update(id: number, payload: StudentEnrollmentPayload) {
        return apiFetch<StudentEnrollment>(`/student-enrollments/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },
    remove(id: number) {
        return apiFetch<void>(`/student-enrollments/${id}`, {
            method: 'DELETE',
        })
    },
}
