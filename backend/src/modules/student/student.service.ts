import { Op } from "sequelize";
import { Student } from "./student.model.js";
import { User } from "../auth/user.model.js";
import { TrainingProgram } from "../training-program/training-program.model.js";
import { Skill } from "../skill/skill.model.js";
import { StudentInterest } from "../student-interest/student-interest.model.js";
import { StudentEnrollment } from "../student-enrollment/student-enrollment.model.js";
import { AcademicYear } from "../academic-year/academic-year.model.js";

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


  // 1:1 eager (como la bici con su detalle): un alumno con su usuario.
  // attributes = las columnas del SELECT. Así no devolvemos passwordHash.
  // SELECT s.*, u.id, u.email, u.is_active FROM students s LEFT JOIN users u ON s.user_id = u.id WHERE s.id = :id;
  static async findWithUserById(id: number) {
    return Student.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "email", "isActive"],
        },
      ],
    });
  }

  // Op.like + required: true (como los clientes cuyo nombre contiene "ibu").
  // required: true convierte el LEFT JOIN en INNER JOIN: solo salen alumnos que tienen matrículas.
  // SELECT s.*, e.* FROM students s INNER JOIN student_enrollments e ON e.student_id = s.id
  // WHERE s.last_name LIKE '%texto%' ORDER BY s.last_name ASC;
  // En PostgreSQL LIKE distingue mayúsculas; Op.iLike no las distingue.
  static async findAllByLastNameWithEnrollments(lastNameSearch: string) {
    return Student.findAll({
      where: {
        lastName: { [Op.like]: `%${lastNameSearch}%` },
      },
      include: [
        {
          model: StudentEnrollment,
          as: "enrollments",
          required: true,
        },
      ],
      order: [["lastName", "ASC"]],
    });
  }

  // N:M con where dentro del include (como las bicis de un frameMaterial dado).
  // El where va en el modelo asociado (Skill), no en Student. Un where en el include
  // hace que Sequelize use INNER JOIN aunque no pongas required: true.
  // through.attributes elige qué columnas de la tabla intermedia (StudentSkill) se muestran.
  // SELECT s.*, sk.*, ss.proficiency_level FROM students s
  // INNER JOIN student_skills ss ON ss.student_id = s.id
  // INNER JOIN skills sk ON sk.id = ss.skill_id
  // WHERE sk.name = :skillName ORDER BY s.id ASC;
  static async findAllEagerlyBySkillName(skillName: string) {
    return Student.findAll({
      include: [
        {
          model: Skill,
          as: "skills",
          where: { name: skillName },
          through: { attributes: ["proficiencyLevel"] },
        },
      ],
      order: [["id", "ASC"]],
    });
  }


  // CONSULTA Q3: alumnos nacidos después de una fecha (como bicis con precio > 100). [Op.gt] = mayor que.
  // SELECT * FROM students WHERE birth_date > :date ORDER BY birth_date ASC;
  static async findAllBornAfter(date: string) {
    return Student.findAll({
      where: { birthDate: { [Op.gt]: date } },
      order: [["birthDate", "ASC"]],
    });
  }

  // CONSULTA Q4: alumnos con una matrícula en estado "enrolled" en un ciclo de un nivel dado
  // (como pedidos con bicis de precio < 100 y peso > 20). Dos where en includes anidados = dos INNER JOIN.
  static async findAllEnrolledByProgramLevel(level: string) {
    return Student.findAll({
      include: [
        {
          model: StudentEnrollment,
          as: "enrollments",
          where: { status: "enrolled" },
          include: [
            { model: TrainingProgram, as: "trainingProgram", where: { level } },
          ],
        },
      ],
      order: [["id", "ASC"]],
    });
  }

  // CONSULTA Q8: alumnos con las skills que tienen a un nivel dado ("advanced").
  // proficiencyLevel es una columna de la TABLA INTERMEDIA (student_skills), no de skills:
  // por eso el where va dentro de "through", no en el include.
  // required: true = solo salen los alumnos que tengan al menos una skill a ese nivel.
  static async findAllWithSkillsAtLevel(level: string) {
    return Student.findAll({
      attributes: ["id", "firstName", "lastName"],
      include: [
        {
          model: Skill,
          as: "skills",
          attributes: ["id", "name"],
          through: { attributes: ["proficiencyLevel"], where: { proficiencyLevel: level } },
          required: true,
        },
      ],
      order: [["id", "ASC"]],
    });
  }


  // CONSULTA Q9: alumnos con sus skills (N:M) y sus intereses (1:N) a la vez: dos include de tipo distinto.
  static async findAllWithSkillsAndInterests() {
    return Student.findAll({
      attributes: ["id", "firstName", "lastName"],
      include: [
        { model: Skill, as: "skills", attributes: ["name"], through: { attributes: ["proficiencyLevel"] } },
        { model: StudentInterest, as: "interests", attributes: ["name"] },
      ],
      order: [["id", "ASC"]],
    });
  }


  static async create(data: {
    userId: number;
    nationalId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    birthDate?: Date | null;
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
      nationalId: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string | null;
      birthDate: Date | null;
    }>
  ) {
    return student.update(data);
  }


  static async delete(student: Student) {
    await student.destroy();
  }
}
