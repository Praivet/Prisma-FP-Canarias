import { apiFetch } from '../../../services/api'

import type {
    SurveyQuestion,
    SurveyQuestionPayload,
} from '../types/surveyQuestion'

export const surveyQuestionService = {
    getAll() {
        return apiFetch<SurveyQuestion[]>('/survey-questions')
    },
    getById(id: number) {
        return apiFetch<SurveyQuestion>(`/survey-questions/${id}`)
    },
    create(payload: SurveyQuestionPayload) {
        return apiFetch<SurveyQuestion>('/survey-questions', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    update(id: number, payload: SurveyQuestionPayload) {
        return apiFetch<SurveyQuestion>(`/survey-questions/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },
    remove(id: number) {
        return apiFetch<void>(`/survey-questions/${id}`, {
            method: 'DELETE',
        })
    },
}
