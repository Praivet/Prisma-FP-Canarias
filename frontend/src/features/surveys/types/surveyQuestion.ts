// Same values as the ENUM in the backend model (survey_questions.question_type).
export type SurveyQuestionType = 'text' | 'number' | 'scale' | 'boolean'

export interface SurveyQuestion {
    id: number
    surveyId: number
    questionText: string
    questionType: SurveyQuestionType
    sortOrder: number
    isRequired: boolean
    createdAt?: string
    updatedAt?: string
}

export interface SurveyQuestionPayload {
    surveyId: number
    questionText: string
    questionType: SurveyQuestionType
    sortOrder?: number
    isRequired?: boolean
}
