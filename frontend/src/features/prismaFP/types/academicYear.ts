export interface AcademicYear {
    id: number
    name: string
    startDate: string
    endDate: string
    isActive: boolean
}

export interface AcademicYearPayload {
    name: string
    startDate: string
    endDate: string
    isActive?: boolean
}
