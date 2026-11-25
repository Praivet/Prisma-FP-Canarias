import StudentRow from './StudentRow'
import type { Student } from '../types/student'

interface StudentListProps {
    students: Student[]
    onEdit: (id: number) => void
    onDelete: (id: number) => void
}

function StudentList({ students, onEdit, onDelete }: StudentListProps) {
    return (
        <div className="overflow-x-auto rounded-lg bg-white shadow">
            <table className="w-full border-collapse">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="p-3 text-left">ID</th>
                        <th className="p-3 text-left">DNI/NIE</th>
                        <th className="p-3 text-left">First name</th>
                        <th className="p-3 text-left">Last name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Phone</th>
                        <th className="p-3 text-left">Birth date</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <StudentRow
                            key={student.id}
                            student={student}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default StudentList
