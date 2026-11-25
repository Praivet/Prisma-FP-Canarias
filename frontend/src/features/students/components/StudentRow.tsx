import Button from '../../../components/ui/Button'
import type { Student } from '../types/student'

interface StudentRowProps {
    student: Student
    onEdit: (id: number) => void
    onDelete: (id: number) => void
}

function StudentRow({ student, onEdit, onDelete }: StudentRowProps) {
    return (
        <tr className="border-b hover:bg-gray-50">
            <td className="p-3">{student.id}</td>
            <td className="p-3">{student.nationalId}</td>
            <td className="p-3">{student.firstName}</td>
            <td className="p-3">{student.lastName}</td>
            <td className="p-3">{student.email}</td>
            <td className="p-3">{student.phone ?? '-'}</td>
            <td className="p-3">{student.birthDate ?? '-'}</td>
            <td className="p-3">
                <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => onEdit(student.id)}>
                        Edit
                    </Button>
                    <Button variant="danger" onClick={() => onDelete(student.id)}>
                        Delete
                    </Button>
                </div>
            </td>
        </tr>
    )
}

export default StudentRow
