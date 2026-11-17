import { apiFetch } from '../../../services/api'

import type {
    SurveyInvitation,
    SurveyInvitationPayload,
} from '../types/surveyInvitation'

export const surveyInvitationService = {
    getAll() {
        return apiFetch<SurveyInvitation[]>('/survey-invitations')
    },
    getById(id: number) {
        return apiFetch<SurveyInvitation>(`/survey-invitations/${id}`)
    },
    create(payload: SurveyInvitationPayload) {
        return apiFetch<SurveyInvitation>('/survey-invitations', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    update(id: number, payload: SurveyInvitationPayload) {
        return apiFetch<SurveyInvitation>(`/survey-invitations/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },
    remove(id: number) {
        return apiFetch<void>(`/survey-invitations/${id}`, {
            method: 'DELETE',
        })
    },
}
