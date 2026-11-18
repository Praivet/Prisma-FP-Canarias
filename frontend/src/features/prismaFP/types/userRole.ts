export interface UserRole {
    userId: number
    roleId: number
    assignedAt: string
}

export interface UserRolePayload {
    userId: number
    roleId: number
    assignedAt?: string
}