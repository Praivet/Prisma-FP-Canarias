import { StudentSkill } from "./student-skill.model";
import { Skill } from "../skill/skill.model";

export class StudentSkillService {

  // Service of the join table of the N:M Student <-> Skill.
  static async findAll() {
    return StudentSkill.findAll({
      order: [["studentId", "ASC"], ["skillId", "ASC"]],
    });
  }


  // Composite PK: findByPk does not work, so we search by both columns.
  static async findById(studentId: number, skillId: number) {
    return StudentSkill.findOne({
      where: { studentId, skillId },
    });
  }

  // The skills of one student, with the skill data (JOIN with skills).
  static async findByStudentId(studentId: number) {
    return StudentSkill.findAll({
      where: { studentId },
      include: [{ model: Skill, as: "skill" }],
      order: [["skillId", "ASC"]],
    });
  }


  static async create(data: {
    studentId: number;
    skillId: number;
    proficiencyLevel?: string | null;
  }) {
    return StudentSkill.create(data);
  }


  // Receives the instance already loaded by the controller (the 404 check is done there).
  // Only proficiencyLevel can change: studentId and skillId are the PK.
  static async update(
    studentSkill: StudentSkill,
    data: Partial<{
      proficiencyLevel: string | null;
    }>
  ) {
    return studentSkill.update(data);
  }


  static async delete(studentSkill: StudentSkill) {
    await studentSkill.destroy();
  }
}
