export interface Survey {
    id: number
    title: string
    description: string | null
    isActive: boolean
    createdAt?: string
    updatedAt?: string
}

export interface SurveyPayload {
    title: string
    description?: string | null
    isActive?: boolean
}
