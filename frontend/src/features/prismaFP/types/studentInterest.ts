export interface StudentInterest {
    id: number
    studentId: number
    name: string
    description: string | null
}

export interface StudentInterestPayload {
    studentId: number
    name: string
    description?: string | null
}
