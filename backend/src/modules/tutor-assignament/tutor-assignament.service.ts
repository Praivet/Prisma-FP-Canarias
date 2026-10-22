import { TutorAssignment } from "./tutor-assignament.model";
import { TrainingProgram } from "../training-program/training-program.model";
import { AcademicYear } from "../academic-year/academic-year.model";

export class TutorAssignmentService {

  static async findAll() {
    return TutorAssignment.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return TutorAssignment.findByPk(id);
  }

  // Two includes = two JOINs (trainingProgram and academicYear). Aliases come from associations.ts.
  static async findAllEagerly() {
    return TutorAssignment.findAll({
      include: [
        { model: TrainingProgram, as: "trainingProgram" },
        { model: AcademicYear, as: "academicYear" },
      ],
      order: [["id", "ASC"]],
    });
  }

  // 1:N query: the assignments of one tutor, with their program and academic year.
  static async findByTutorId(tutorId: number) {
    return TutorAssignment.findAll({
      where: { tutorId },
      include: [
        { model: TrainingProgram, as: "trainingProgram" },
        { model: AcademicYear, as: "academicYear" },
      ],
      order: [["assignedAt", "DESC"]],
    });
  }


  static async create(data: {
    tutorId: number;
    programId: number;
    academicYearId: number;
    assignedAt?: Date;
  }) {
    return TutorAssignment.create(data);
  }


  // Receives the instance already loaded by the controller (the 404 check is done there).
  static async update(
    tutorAssignment: TutorAssignment,
    data: Partial<{
      tutorId: number;
      programId: number;
      academicYearId: number;
      assignedAt: Date;
    }>
  ) {
    return tutorAssignment.update(data);
  }


  static async delete(tutorAssignment: TutorAssignment) {
    await tutorAssignment.destroy();
  }
}
