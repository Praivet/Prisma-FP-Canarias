export interface EducationalCenter {
    id: number
    name: string
    code: string
    logoUrl: string
    address: string
    isActive: boolean
}

export interface EducationalCenterPayload {
    name: string
    code: string
    logoUrl: string
    address: string
    isActive?: boolean
}