export interface SurveyAnswer {
    id: number
    invitationId: number
    questionId: number
    answerValue: string
    answeredAt: string
    createdAt?: string
    updatedAt?: string
}

export interface SurveyAnswerPayload {
    invitationId: number
    questionId: number
    answerValue: string
    answeredAt?: string
}
