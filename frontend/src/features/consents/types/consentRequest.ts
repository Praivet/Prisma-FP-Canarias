export interface ConsentRequest {
    id: number
    studentId: number
    sentById: number
    tokenHash: string
    sentAt: string
    expiresAt: string
    usedAt: string | null
    createdAt?: string
    updatedAt?: string
}

export interface ConsentRequestPayload {
    studentId: number
    sentById: number
    tokenHash: string
    sentAt?: string
    expiresAt: string
    usedAt?: string | null
}
