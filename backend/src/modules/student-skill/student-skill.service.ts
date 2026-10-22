import { StudentSkill, SkillLevel } from "./student-skill.model";
import { Skill } from "../skill/skill.model";

export class StudentSkillService {

  // Service of the join table of the N:M Student <-> Skill.
  static async findAll() {
    return StudentSkill.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return StudentSkill.findByPk(id);
  }

  // The skills of one student, with the skill data (JOIN with skills).
  static async findByStudentId(studentId: number) {
    return StudentSkill.findAll({
      where: { studentId },
      include: [{ model: Skill, as: "skill" }],
      order: [["id", "ASC"]],
    });
  }


  static async create(data: {
    studentId: number;
    skillId: number;
    level?: SkillLevel;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return StudentSkill.create(data);
  }


  // Receives the instance already loaded by the controller (the 404 check is done there).
  static async update(
    studentSkill: StudentSkill,
    data: Partial<{
      studentId: number;
      skillId: number;
      level: SkillLevel;
    }>
  ) {
    return studentSkill.update(data);
  }


  static async delete(studentSkill: StudentSkill) {
    await studentSkill.destroy();
  }
}
