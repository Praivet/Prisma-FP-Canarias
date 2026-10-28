export interface Skill {
    id: number
    name: string
    category: string | null
    description: string | null
}

export interface SkillPayload {
    name: string
    category?: string | null
    description?: string | null
}
