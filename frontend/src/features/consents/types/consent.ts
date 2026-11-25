// Same values as the ENUM in the backend model (consents.status).
export type ConsentStatus = 'granted' | 'denied' | 'revoked'

export interface Consent {
    id: number
    studentId: number
    consentRequestId: number | null
    purpose: string
    status: ConsentStatus
    policyVersion: string
    recordedAt: string
    createdAt?: string
    updatedAt?: string
}

export interface ConsentPayload {
    studentId: number
    consentRequestId?: number | null
    purpose: string
    status: ConsentStatus
    policyVersion: string
    recordedAt?: string
}
