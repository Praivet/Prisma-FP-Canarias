import { TrainingProgram } from "./training-program.model";
import { StudentEnrollment } from "../student-enrollment/student-enrollment.model";
import { TutorAssignment } from "../tutor-assignament/tutor-assignament.model";

export class TrainingProgramService {

  static async findAll() {
    return TrainingProgram.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return TrainingProgram.findByPk(id);
  }

  // 1:N eager query: a training program with its enrollments and its tutor assignments.
  static async findEagerlyById(id: number) {
    return TrainingProgram.findByPk(id, {
      include: [
        { model: StudentEnrollment, as: "enrollments" },
        { model: TutorAssignment, as: "tutorAssignments" },
      ],
    });
  }


  static async create(data: {
    familyId: number;
    centerId: number;
    name: string;
    code: string;
    level: string;
    isActive?: boolean;
  }) {
    return TrainingProgram.create(data);
  }


  // Receives the instance already loaded by the controller (the 404 check is done there).
  static async update(
    trainingProgram: TrainingProgram,
    data: Partial<{
      familyId: number;
      centerId: number;
      name: string;
      code: string;
      level: string;
      isActive: boolean;
    }>
  ) {
    return trainingProgram.update(data);
  }


  static async delete(trainingProgram: TrainingProgram) {
    await trainingProgram.destroy();
  }
}
