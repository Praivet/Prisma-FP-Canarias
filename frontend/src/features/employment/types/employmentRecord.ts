export interface EmploymentRecord {
    id: number
    studentId: number
    companyId: number
    internshipId: number | null
    position: string
    sector: string | null
    startDate: string
    endDate: string | null
    isRelatedToStudies: boolean
    createdAt?: string
    updatedAt?: string
}

export interface EmploymentRecordPayload {
    studentId: number
    companyId: number
    internshipId?: number | null
    position: string
    sector?: string | null
    startDate: string
    endDate?: string | null
    isRelatedToStudies?: boolean
}
