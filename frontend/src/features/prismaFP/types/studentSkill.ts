// No own id: the PK is composite (studentId + skillId).
export interface StudentSkill {
    studentId: number
    skillId: number
    proficiencyLevel: string | null
    updatedAt?: string
}

export interface StudentSkillPayload {
    studentId: number
    skillId: number
    proficiencyLevel?: string | null
}

// PUT /student-skills/:studentId/:skillId: the ids go in the URL, only proficiencyLevel can change.
export interface StudentSkillUpdatePayload {
    proficiencyLevel: string | null
}
