import { StudentInterest } from "./student-interest.model";

export class StudentInterestService {

  static async findAll() {
    return StudentInterest.findAll({
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
    createdAt?: Date;
    updatedAt?: Date;
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
