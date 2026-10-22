import { Skill } from "./skill.model";
import { Student } from "../student/student.model";

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
