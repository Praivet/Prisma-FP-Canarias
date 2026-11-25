import { apiFetch } from '../../../services/api'

import type {
    StudentSkill,
    StudentSkillPayload,
    StudentSkillUpdatePayload,
} from '../types/studentSkill'

// Composite PK: one row is identified by studentId + skillId.
export const studentSkillService = {
    getAll() {
        return apiFetch<StudentSkill[]>('/student-skills')
    },
    getById(studentId: number, skillId: number) {
        return apiFetch<StudentSkill>(`/student-skills/${studentId}/${skillId}`)
    },
    create(payload: StudentSkillPayload) {
        return apiFetch<StudentSkill>('/student-skills', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
    update(studentId: number, skillId: number, payload: StudentSkillUpdatePayload) {
        return apiFetch<StudentSkill>(`/student-skills/${studentId}/${skillId}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })
    },
    remove(studentId: number, skillId: number) {
        return apiFetch<void>(`/student-skills/${studentId}/${skillId}`, {
            method: 'DELETE',
        })
    },
}
