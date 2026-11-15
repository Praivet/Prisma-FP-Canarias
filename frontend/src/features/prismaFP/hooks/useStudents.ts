import { useEffect, useState } from 'react'

import { studentService } from '../services/studentService'
import type { Student, StudentPayload } from '../types/student'

export function useStudents() {
    const [students, setStudents] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    async function loadStudents() {
        try {
            setLoading(true)
            setError(null)
            const data = await studentService.getAll()
            setStudents(data)
        } catch {
            setError('Could not load students')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        void loadStudents()
    }, [])

    async function saveStudent(id: number | null, payload: StudentPayload) {
        try {
            setLoading(true)
            setError(null)
            if (id === null) {
                await studentService.create(payload)
            } else {
                await studentService.update(id, payload)
            }
            await loadStudents()
        } catch {
            setError('Could not save student')
        } finally {
            setLoading(false)
        }
    }

    async function deleteStudent(id: number) {
        try {
            setLoading(true)
            setError(null)
            await studentService.remove(id)
            await loadStudents()
        } catch {
            setError('Could not delete student')
        } finally {
            setLoading(false)
        }
    }

    return { students, loading, error, setError, loadStudents, saveStudent, deleteStudent }
}
