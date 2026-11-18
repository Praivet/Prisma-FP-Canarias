export interface AuditLog {
    id: number
    userId: number
    action: string
    entityType: string
    entityId: number
    previousValues: Record<string, unknown> | null
    newValues: Record<string, unknown> | null
    createdAt: string
}

export interface AuditLogPayload {
    userId: number
    action: string
    entityType: string
    entityId: number
    previousValues?: Record<string, unknown> | null
    newValues?: Record<string, unknown> | null
}