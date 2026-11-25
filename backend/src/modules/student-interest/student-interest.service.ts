import { Op } from "sequelize";
import { StudentInterest } from "./student-interest.model.js";
import { Student } from "../student/student.model.js";

export class StudentInterestService {

  static async findAll() {
    return StudentInterest.findAll({
      order: [["id", "ASC"]],
    });
  }


  // CONSULTA Q14: intereses cuyo nombre CONTIENE un texto, con el alumno al que pertenecen.
  // [Op.iLike] = como Op.like pero sin distinguir mayúsculas (solo PostgreSQL).
  // `%${text}%` = contiene; `${text}%` = empieza por; `%${text}` = termina en.
  static async findAllByNameContaining(text: string) {
    return StudentInterest.findAll({
      where: { name: { [Op.iLike]: `%${text}%` } },
      include: [{ model: Student, as: "student", attributes: ["firstName", "lastName"] }],
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return StudentInterest.findByPk(id);
  }

  // 1:N query: the interests of one student. No include needed: studentId is a column of this table.
  static async findByStudentId(studentId: number) {
    return StudentInterest.findAll({
      where: { studentId },
      order: [["id", "ASC"]],
    });
  }


  static async create(data: {
    studentId: number;
    name: string;
    description?: string | null;
  }) {
    return StudentInterest.create(data);
  }


  // Receives the instance already loaded by the controller (the 404 check is done there).
  static async update(
    studentInterest: StudentInterest,
    data: Partial<{
      studentId: number;
      name: string;
      description: string | null;
    }>
  ) {
    return studentInterest.update(data);
  }


  static async delete(studentInterest: StudentInterest) {
    await studentInterest.destroy();
  }
}
