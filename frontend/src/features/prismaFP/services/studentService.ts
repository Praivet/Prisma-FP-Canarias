import { apiFetch } from '../../../services/api'

import type {
    Student,
    StudentPayload,
} from '../types/student'

export const studentService = {
    getAll() {
        return apiFetch<Student[]>('/students')
    },
    getById(id: number) {
        return apiFetch<Student>(`/students/${id}`)
    },
    create(payload: StudentPayload) {
        return apiFetch<Student>('/students', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    update(id: number, payload: StudentPayload) {
        return apiFetch<Student>(`/students/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },
    remove(id: number) {
        return apiFetch<void>(`/students/${id}`, {
            method: 'DELETE',
        })
    },
}
