export interface TrainingProgram {
    id: number
    familyId: number
    centerId: number
    name: string
    code: string
    level: string
    isActive: boolean
}

export interface TrainingProgramPayload {
    familyId: number
    centerId: number
    name: string
    code: string
    level: string
    isActive?: boolean
}
