import { apiFetch } from '../../../services/api'

import type {
    Skill,
    SkillPayload,
} from '../types/skill'

export const skillService = {
    getAll() {
        return apiFetch<Skill[]>('/skills')
    },
    getById(id: number) {
        return apiFetch<Skill>(`/skills/${id}`)
    },
    create(payload: SkillPayload) {
        return apiFetch<Skill>('/skills', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    update(id: number, payload: SkillPayload) {
        return apiFetch<Skill>(`/skills/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },
    remove(id: number) {
        return apiFetch<void>(`/skills/${id}`, {
            method: 'DELETE',
        })
    },
}
