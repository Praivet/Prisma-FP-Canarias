import { AcademicYear } from "./academic-year.model.js";
import { StudentEnrollment } from "../student-enrollment/student-enrollment.model.js";
import { TutorAssignment } from "../tutor-assignament/tutor-assignament.model.js";

export class AcademicYearService {

  static async findAll() {
    return AcademicYear.findAll({
      order: [["id", "ASC"]],
    });
  }


  // CONSULTA Q13: el curso activo (isActive = true) con sus matrículas y sus asignaciones de tutor.
  // where en el principal (AcademicYear) + dos include de los dos hasMany que tiene.
  // findOne = el primero que cumpla el where (devuelve un objeto o null, no un array).
  static async findActiveEagerly() {
    return AcademicYear.findOne({
      where: { isActive: true },
      include: [
        { model: StudentEnrollment, as: "enrollments", attributes: ["id", "studentId", "status"] },
        { model: TutorAssignment, as: "tutorAssignments", attributes: ["id", "tutorId", "programId"] },
      ],
    });
  }


  static async findById(id: number) {
    return AcademicYear.findByPk(id);
  }

  // 1:N eager query: an academic year with its enrollments. 'as' comes from associations.ts.
  static async findEagerlyById(id: number) {
    return AcademicYear.findByPk(id, {
      include: [
        { model: StudentEnrollment, as: "enrollments" },
      ],
    });
  }


  static async create(data: {
    name: string;
    startDate: Date;
    endDate: Date;
    isActive?: boolean;
  }) {
    return AcademicYear.create(data);
  }


  // Receives the instance already loaded by the controller (the 404 check is done there).
  static async update(
    academicYear: AcademicYear,
    data: Partial<{
      name: string;
      startDate: Date;
      endDate: Date;
      isActive: boolean;
    }>
  ) {
    return academicYear.update(data);
  }


  static async delete(academicYear: AcademicYear) {
    await academicYear.destroy();
  }
}
