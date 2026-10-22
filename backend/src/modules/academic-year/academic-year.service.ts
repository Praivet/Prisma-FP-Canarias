import { AcademicYear } from "./academic-year.model";
import { StudentEnrollment } from "../student-enrollment/student-enrollment.model";

export class AcademicYearService {

  static async findAll() {
    return AcademicYear.findAll({
      order: [["id", "ASC"]],
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
