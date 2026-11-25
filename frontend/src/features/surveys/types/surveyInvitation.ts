export interface SurveyInvitation {
    id: number
    surveyId: number
    studentId: number
    tokenHash: string
    sentAt: string
    expiresAt: string
    completedAt: string | null
    createdAt?: string
    updatedAt?: string
}

export interface SurveyInvitationPayload {
    surveyId: number
    studentId: number
    tokenHash: string
    sentAt?: string
    expiresAt: string
    completedAt?: string | null
}
