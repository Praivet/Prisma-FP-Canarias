import { Skill } from "./skill.model.js";
import { Student } from "../student/student.model.js";
import { StudentEnrollment } from "../student-enrollment/student-enrollment.model.js";
import { TrainingProgram } from "../training-program/training-program.model.js";

export class SkillService {

  static async findAll() {
    return Skill.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return Skill.findByPk(id);
  }

  // N:M eager query: a skill with the students that have it (through StudentSkill).
  static async findEagerlyById(id: number) {
    return Skill.findByPk(id, {
      include: [
        { model: Student, as: "students" },
      ],
    });
  }


  // CONSULTA Q7: skills de los alumnos que tienen una matrícula con un estado dado en un ciclo dado.
  // Son tres saltos: Skill -> students (N:M) -> enrollments (1:N) -> trainingProgram (belongsTo).
  // Cada where va en el include de la tabla donde está ese campo. Los where hacen INNER JOIN.
  // required: true en students para que no salgan skills que nadie tiene.
  // through: { attributes: [] } = no traigas las columnas de la tabla intermedia student_skills.
  static async findAllByEnrollmentStatusAndProgramCode(status: string, programCode: string) {
    return Skill.findAll({
      include: [
        {
          model: Student,
          as: "students",
          required: true,
          attributes: ["id", "firstName", "lastName"],
          through: { attributes: [] },
          include: [
            {
              model: StudentEnrollment,
              as: "enrollments",
              where: { status },
              attributes: ["id", "status"],
              include: [
                { model: TrainingProgram, as: "trainingProgram", where: { code: programCode }, attributes: ["code"] },
              ],
            },
          ],
        },
      ],
      order: [["id", "ASC"]],
    });
  }


  // CONSULTA Q15: where simple por una columna de la propia tabla, ordenado por nombre.
  static async findAllByCategory(category: string) {
    return Skill.findAll({
      where: { category },
      order: [["name", "ASC"]],
    });
  }


  static async create(data: {
    name: string;
    category?: string | null;
    description?: string | null;
  }) {
    return Skill.create(data);
  }


  // Receives the instance already loaded by the controller (the 404 check is done there).
  static async update(
    skill: Skill,
    data: Partial<{
      name: string;
      category: string | null;
      description: string | null;
    }>
  ) {
    return skill.update(data);
  }


  static async delete(skill: Skill) {
    await skill.destroy();
  }
}
