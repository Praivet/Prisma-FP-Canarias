import { apiFetch } from '../../../services/api'

import type {
    SurveyAnswer,
    SurveyAnswerPayload,
} from '../types/surveyAnswer'

export const surveyAnswerService = {
    getAll() {
        return apiFetch<SurveyAnswer[]>('/survey-answers')
    },
    getById(id: number) {
        return apiFetch<SurveyAnswer>(`/survey-answers/${id}`)
    },
    create(payload: SurveyAnswerPayload) {
        return apiFetch<SurveyAnswer>('/survey-answers', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    update(id: number, payload: SurveyAnswerPayload) {
        return apiFetch<SurveyAnswer>(`/survey-answers/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },
    remove(id: number) {
        return apiFetch<void>(`/survey-answers/${id}`, {
            method: 'DELETE',
        })
    },
}
