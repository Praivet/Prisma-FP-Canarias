export interface User {
    id: number
    email: string
    passwordHash: string
    firstName: string
    lastName: string
    isActive: boolean
    failedLoginAttempts: number
    lockedUntil: string | null
    createdAt?: string
    updatedAt?: string
}

export interface UserPayload {
    email: string
    passwordHash: string
    firstName: string
    lastName: string
    isActive?: boolean
    failedLoginAttempts?: number
    lockedUntil?: string | null
}