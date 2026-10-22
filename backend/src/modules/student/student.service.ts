import { Student } from "./student.model";
import { Skill } from "../skill/skill.model";
import { StudentInterest } from "../student-interest/student-interest.model";
import { StudentEnrollment } from "../student-enrollment/student-enrollment.model";
import { AcademicYear } from "../academic-year/academic-year.model";

export class StudentService {

  static async findAll() {
    return Student.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return Student.findByPk(id);
  }

  // A student with everything that hangs from it:
  // interests (1:N), skills (N:M) and enrollments (1:N) with their academic year (nested include).
  static async findEagerlyById(id: number) {
    return Student.findByPk(id, {
      include: [
        { model: StudentInterest, as: "interests" },
        { model: Skill, as: "skills" },
        {
          model: StudentEnrollment,
          as: "enrollments",
          include: [{ model: AcademicYear, as: "academicYear" }],
        },
      ],
    });
  }


  static async create(data: {
    userId: number;
    birthDate?: Date | null;
    phone?: string | null;
    city?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return Student.create(data);
  }


  // Receives the instance already loaded by the controller (the 404 check is done there).
  static async update(
    student: Student,
    data: Partial<{
      userId: number;
      birthDate: Date | null;
      phone: string | null;
      city: string | null;
    }>
  ) {
    return student.update(data);
  }


  static async delete(student: Student) {
    await student.destroy();
  }
}
