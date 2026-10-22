import { StudentEnrollment, EnrollmentStatus } from "./student-enrollment.model";
import { Student } from "../student/student.model";
import { AcademicYear } from "../academic-year/academic-year.model";

export class StudentEnrollmentService {

  static async findAll() {
    return StudentEnrollment.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return StudentEnrollment.findByPk(id);
  }

  // Two includes = two JOINs (student and academicYear). Aliases come from associations.ts.
  static async findAllEagerly() {
    return StudentEnrollment.findAll({
      include: [
        { model: Student, as: "student" },
        { model: AcademicYear, as: "academicYear" },
      ],
      order: [["id", "ASC"]],
    });
  }

  // 1:N query: the enrollments of one student, with their academic year.
  static async findByStudentId(studentId: number) {
    return StudentEnrollment.findAll({
      where: { studentId },
      include: [{ model: AcademicYear, as: "academicYear" }],
      order: [["enrollmentDate", "DESC"]],
    });
  }


  static async create(data: {
    studentId: number;
    trainingProgramId: number;
    academicYearId: number;
    enrollmentDate?: Date;
    status?: EnrollmentStatus;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return StudentEnrollment.create(data);
  }


  // Receives the instance already loaded by the controller (the 404 check is done there).
  static async update(
    studentEnrollment: StudentEnrollment,
    data: Partial<{
      studentId: number;
      trainingProgramId: number;
      academicYearId: number;
      enrollmentDate: Date;
      status: EnrollmentStatus;
    }>
  ) {
    return studentEnrollment.update(data);
  }


  static async delete(studentEnrollment: StudentEnrollment) {
    await studentEnrollment.destroy();
  }
}
