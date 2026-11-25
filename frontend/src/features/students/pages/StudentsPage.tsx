import StudentList from '../components/StudentList'
import { useStudents } from '../hooks/useStudents'

function StudentsPage() {
    const { students, loading, error, deleteStudent } = useStudents()

    // The notes do not cover the edit form yet, so Edit only logs the id.
    function handleEdit(id: number) {
        console.log('Edit student', id)
    }

    return (
        <main className="mx-auto max-w-6xl p-6">
            <h1 className="mb-6 text-3xl font-bold">Students</h1>

            {loading ? (
                <p role="status">Cargando…</p>
            ) : error ? (
                <p role="alert" className="text-red-600">{error}</p>
            ) : students.length === 0 ? (
                <p>No hay estudiantes disponibles.</p>
            ) : (
                <StudentList
                    students={students}
                    onEdit={handleEdit}
                    onDelete={(id) => void deleteStudent(id)}
                />
            )}
        </main>
    )
}

export default StudentsPage
