import { apiFetch } from '../../../services/api'

import type {
    TrainingProgram,
    TrainingProgramPayload,
} from '../types/trainingProgram'

export const trainingProgramService = {
    getAll() {
        return apiFetch<TrainingProgram[]>('/training-programs')
    },
    getById(id: number) {
        return apiFetch<TrainingProgram>(`/training-programs/${id}`)
    },
    create(payload: TrainingProgramPayload) {
        return apiFetch<TrainingProgram>('/training-programs', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    update(id: number, payload: TrainingProgramPayload) {
        return apiFetch<TrainingProgram>(`/training-programs/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },
    remove(id: number) {
        return apiFetch<void>(`/training-programs/${id}`, {
            method: 'DELETE',
        })
    },
}
