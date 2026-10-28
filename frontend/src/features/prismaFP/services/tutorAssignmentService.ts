import { apiFetch } from '../../../services/api'

import type {
    TutorAssignment,
    TutorAssignmentPayload,
} from '../types/tutorAssignment'

export const tutorAssignmentService = {
    getAll() {
        return apiFetch<TutorAssignment[]>('/tutor-assignments')
    },
    getById(id: number) {
        return apiFetch<TutorAssignment>(`/tutor-assignments/${id}`)
    },
    create(payload: TutorAssignmentPayload) {
        return apiFetch<TutorAssignment>('/tutor-assignments', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    update(id: number, payload: TutorAssignmentPayload) {
        return apiFetch<TutorAssignment>(`/tutor-assignments/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },
    remove(id: number) {
        return apiFetch<void>(`/tutor-assignments/${id}`, {
            method: 'DELETE',
        })
    },
}
