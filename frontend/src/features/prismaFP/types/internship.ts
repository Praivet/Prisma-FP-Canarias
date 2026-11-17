export interface Internship {
    id: number
    enrollmentId: number
    companyId: number
    startDate: string
    endDate: string | null
    wasHired: boolean
    hiringDate: string | null
    createdAt?: string
    updatedAt?: string
}

export interface InternshipPayload {
    enrollmentId: number
    companyId: number
    startDate: string
    endDate?: string | null
    wasHired?: boolean
    hiringDate?: string | null
}
