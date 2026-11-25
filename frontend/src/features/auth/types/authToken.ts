export interface AuthToken {
    id: number
    userId: number
    tokenHash: string
    tokenType: string
    expiresAt: string
    usedAt: string | null
    createdAt?: string
}

export interface AuthTokenPayload {
    userId: number
    tokenHash: string
    tokenType: string
    expiresAt: string
    usedAt?: string | null
}