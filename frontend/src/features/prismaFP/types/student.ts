export interface Student {
    id: number
    userId: number
    nationalId: string
    firstName: string
    lastName: string
    email: string
    phone: string | null
    birthDate: string | null
    createdAt?: string
    updatedAt?: string
}

export interface StudentPayload {
    userId: number
    nationalId: string
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    birthDate?: string | null
}
