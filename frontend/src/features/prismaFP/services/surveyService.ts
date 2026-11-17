import { apiFetch } from '../../../services/api'

import type {
    Survey,
    SurveyPayload,
} from '../types/survey'

export const surveyService = {
    getAll() {
        return apiFetch<Survey[]>('/surveys')
    },
    getById(id: number) {
        return apiFetch<Survey>(`/surveys/${id}`)
    },
    create(payload: SurveyPayload) {
        return apiFetch<Survey>('/surveys', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    update(id: number, payload: SurveyPayload) {
        return apiFetch<Survey>(`/surveys/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },
    remove(id: number) {
        return apiFetch<void>(`/surveys/${id}`, {
            method: 'DELETE',
        })
    },
}
