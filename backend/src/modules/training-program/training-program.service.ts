import { TrainingProgram } from "./training-program.model.js";
import { StudentEnrollment } from "../student-enrollment/student-enrollment.model.js";
import { TutorAssignment } from "../tutor-assignament/tutor-assignament.model.js";
import { ProfessionalFamily } from "../professional-family/professional-family.model.js";
import { EducationalCenter } from "../educational-center/educational-center.model.js";

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
        // belongsTo: la familia profesional y el centro del ciclo, solo con las columnas que interesan.
        { model: ProfessionalFamily, as: "family", attributes: ["id", "name", "code"] },
        { model: EducationalCenter, as: "center", attributes: ["id", "name", "code"] },
      ],
    });
  }


  // CONSULTA Q1: todos los ciclos con su familia profesional y su centro (dos include al mismo nivel).
  // Sin where en los include = LEFT JOIN: salen todos los ciclos.
  static async findAllWithFamilyAndCenter() {
    return TrainingProgram.findAll({
      include: [
        { model: ProfessionalFamily, as: "family", attributes: ["id", "name", "code"] },
        { model: EducationalCenter, as: "center", attributes: ["id", "name", "code"] },
      ],
      order: [["id", "ASC"]],
    });
  }


  // CONSULTA Q2: ciclos de una familia profesional dada por su CÓDIGO ("IFC").
  // El código está en professional_families, no en training_programs -> el where va DENTRO del include.
  // Con where en el include es un INNER JOIN: solo salen los ciclos de esa familia.
  static async findAllByFamilyCode(familyCode: string) {
    return TrainingProgram.findAll({
      include: [
        { model: ProfessionalFamily, as: "family", where: { code: familyCode }, attributes: ["id", "name", "code"] },
      ],
      order: [["id", "ASC"]],
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
