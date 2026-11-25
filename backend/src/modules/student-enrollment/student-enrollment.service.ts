import { StudentEnrollment } from "./student-enrollment.model.js";
import { Student } from "../student/student.model.js";
import { AcademicYear } from "../academic-year/academic-year.model.js";
import { Op } from "sequelize";
import { TrainingProgram } from "../training-program/training-program.model.js";

export class StudentEnrollmentService {

  static async findAll() {
    return StudentEnrollment.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return StudentEnrollment.findByPk(id);
  }

  // Three includes = three JOINs (student, trainingProgram and academicYear). Aliases come from associations.ts.
  static async findAllEagerly() {
    return StudentEnrollment.findAll({
      include: [
        { model: Student, as: "student" },
        { model: TrainingProgram, as: "trainingProgram" },
        { model: AcademicYear, as: "academicYear" },
      ],
      order: [["id", "ASC"]],
    });
  }

  // 1:N query (como los pedidos de un cliente): las matrículas de un alumno, de la más reciente a la más antigua.
  // attributes elige las columnas del modelo incluido (lo que pondrías en el SELECT).
  // SELECT e.*, s.id, s.first_name, s.last_name, s.email, a.id, a.name
  // FROM student_enrollments e LEFT JOIN students s ON e.student_id = s.id
  // LEFT JOIN academic_years a ON e.academic_year_id = a.id
  // WHERE e.student_id = :studentId ORDER BY e.enrollment_date DESC;
  static async findByStudentId(studentId: number) {
    return StudentEnrollment.findAll({
      where: { studentId },
      include: [
        { model: Student, as: "student", attributes: ["id", "firstName", "lastName", "email"] },
        { model: AcademicYear, as: "academicYear", attributes: ["id", "name"] },
      ],
      order: [["enrollmentDate", "DESC"]],
    });
  }

  // where dentro del include (como las bicis de carbono): las matrículas de un curso académico por su nombre.
  // SELECT e.*, a.* FROM student_enrollments e INNER JOIN academic_years a ON e.academic_year_id = a.id
  // WHERE a.name = '2025-2026' ORDER BY e.id ASC;
  static async findAllEagerlyByAcademicYearName(academicYearName: string) {
    return StudentEnrollment.findAll({
      include: [
        {
          model: AcademicYear,
          as: "academicYear",
          where: { name: academicYearName },
        },
        { model: Student, as: "student", attributes: ["id", "firstName", "lastName"] },
      ],
      order: [["id", "ASC"]],
    });
  }


  // CONSULTA Q5: todas las matrículas con su alumno (solo nombre y apellidos) y su ciclo (solo nombre y código).
  // attributes = qué columnas quiero de cada tabla (como el SELECT nombre, apellidos ...).
  static async findAllWithStudentAndProgram() {
    return StudentEnrollment.findAll({
      include: [
        { model: Student, as: "student", attributes: ["firstName", "lastName"] },
        { model: TrainingProgram, as: "trainingProgram", attributes: ["name", "code"] },
      ],
      order: [["id", "ASC"]],
    });
  }


  // CONSULTA Q6: matrículas con fecha anterior a una dada (como pedidos antes del 3 de abril). [Op.lt] = menor que.
  static async findAllBefore(date: string) {
    return StudentEnrollment.findAll({
      where: { enrollmentDate: { [Op.lt]: date } },
      order: [["enrollmentDate", "ASC"]],
    });
  }


  // CONSULTA Q10: where simple sobre la propia tabla, sin Op y sin include.
  // SQL: SELECT * FROM student_enrollments WHERE status = :status
  // { status } es lo mismo que { status: status } (la variable se llama igual que la columna).
  static async findAllByStatus(status: string) {
    return StudentEnrollment.findAll({
      where: { status },
      order: [["id", "ASC"]],
    });
  }


  // CONSULTA Q11: [Op.between] = entre dos valores, los dos incluidos. Recibe un array [desde, hasta].
  // SQL: ... WHERE enrollment_date BETWEEN :from AND :to ORDER BY enrollment_date DESC
  static async findAllBetween(from: string, to: string) {
    return StudentEnrollment.findAll({
      where: { enrollmentDate: { [Op.between]: [from, to] } },
      order: [["enrollmentDate", "DESC"]],
    });
  }


  // CONSULTA Q12: [Op.ne] null = "que tenga valor" (no vacío). Con include de Student para ver de quién es.
  // SQL: ... WHERE notes IS NOT NULL
  static async findAllWithNotes() {
    return StudentEnrollment.findAll({
      where: { notes: { [Op.ne]: null } },
      include: [{ model: Student, as: "student", attributes: ["firstName", "lastName"] }],
      order: [["id", "ASC"]],
    });
  }


  static async create(data: {
    studentId: number;
    programId: number;
    academicYearId: number;
    enrollmentDate?: Date;
    graduationDate?: Date | null;
    status?: string;
    notes?: string | null;
  }) {
    return StudentEnrollment.create(data);
  }


  // Receives the instance already loaded by the controller (the 404 check is done there).
  static async update(
    studentEnrollment: StudentEnrollment,
    data: Partial<{
      studentId: number;
      programId: number;
      academicYearId: number;
      enrollmentDate: Date;
      graduationDate: Date | null;
      status: string;
      notes: string | null;
    }>
  ) {
    return studentEnrollment.update(data);
  }


  static async delete(studentEnrollment: StudentEnrollment) {
    await studentEnrollment.destroy();
  }
}
