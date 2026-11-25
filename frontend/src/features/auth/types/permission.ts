export interface Permission {
    id: number
    code: string
    description: string
}

export interface PermissionPayload {
    code: string
    description: string
}