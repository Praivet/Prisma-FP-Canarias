export interface TutorAssignment {
    id: number
    tutorId: number
    programId: number
    academicYearId: number
    assignedAt: string
}

export interface TutorAssignmentPayload {
    tutorId: number
    programId: number
    academicYearId: number
    assignedAt?: string
}
