export interface StudentEnrollment {
    id: number
    studentId: number
    programId: number
    academicYearId: number
    enrollmentDate: string
    graduationDate: string | null
    status: string
}

export interface StudentEnrollmentPayload {
    studentId: number
    programId: number
    academicYearId: number
    enrollmentDate?: string
    graduationDate?: string | null
    status?: string
}
