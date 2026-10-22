import { AcademicYear } from "../modules/academic-year/academic-year.model.js";
import { Skill } from "../modules/skill/skill.model.js";
import { Student } from "../modules/student/student.model.js";
import { StudentEnrollment } from "../modules/student-enrollment/student-enrollment.model.js";
import { StudentInterest } from "../modules/student-interest/student-interest.model.js";
import { StudentSkill } from "../modules/student-skill/student-skill.model.js";
// TODO: uncomment when these models are implemented (their files are still empty).
// import { User } from "../modules/user/user.model.js";
// import { TrainingProgram } from "../modules/training-program/training-program.model.js";
// import { EducationalCenter } from "../modules/educational-center/educational-center.model.js";
// import { ProfessionalFamily } from "../modules/professional-family/professional-family.model.js";

export function defineAssociations() {
  console.log("Associations defined");

  // 1:1 User -> Student. The FK (userId, unique) is in students.
  // User.hasOne(Student, { foreignKey: "userId", as: "student", onDelete: "CASCADE" });
  // Student.belongsTo(User, { foreignKey: "userId", as: "user" });

  // 1:N Student -> StudentEnrollment
  Student.hasMany(StudentEnrollment, { foreignKey: "studentId", as: "enrollments", onDelete: "CASCADE" });
  StudentEnrollment.belongsTo(Student, { foreignKey: "studentId", as: "student" });

  // 1:N TrainingProgram -> StudentEnrollment
  // TrainingProgram.hasMany(StudentEnrollment, { foreignKey: "trainingProgramId", as: "enrollments" });
  // StudentEnrollment.belongsTo(TrainingProgram, { foreignKey: "trainingProgramId", as: "trainingProgram" });

  // 1:N AcademicYear -> StudentEnrollment
  AcademicYear.hasMany(StudentEnrollment, { foreignKey: "academicYearId", as: "enrollments" });
  StudentEnrollment.belongsTo(AcademicYear, { foreignKey: "academicYearId", as: "academicYear" });

  // 1:N Student -> StudentInterest
  Student.hasMany(StudentInterest, { foreignKey: "studentId", as: "interests", onDelete: "CASCADE" });
  StudentInterest.belongsTo(Student, { foreignKey: "studentId", as: "student" });

  // N:M Student <-> Skill through the join table StudentSkill.
  Student.belongsToMany(Skill, { through: StudentSkill, foreignKey: "studentId", otherKey: "skillId", as: "skills" });
  Skill.belongsToMany(Student, { through: StudentSkill, foreignKey: "skillId", otherKey: "studentId", as: "students" });

  // The join table also gets its own 1:N on each side, to query it directly (like OrderItem).
  Student.hasMany(StudentSkill, { foreignKey: "studentId", as: "studentSkills" });
  StudentSkill.belongsTo(Student, { foreignKey: "studentId", as: "student" });

  Skill.hasMany(StudentSkill, { foreignKey: "skillId", as: "studentSkills" });
  StudentSkill.belongsTo(Skill, { foreignKey: "skillId", as: "skill" });

  // 1:N EducationalCenter -> TrainingProgram and ProfessionalFamily -> TrainingProgram
  // (not part of these six entities, ready for whoever implements TrainingProgram).
  // EducationalCenter.hasMany(TrainingProgram, { foreignKey: "educationalCenterId", as: "trainingPrograms" });
  // TrainingProgram.belongsTo(EducationalCenter, { foreignKey: "educationalCenterId", as: "educationalCenter" });
  // ProfessionalFamily.hasMany(TrainingProgram, { foreignKey: "professionalFamilyId", as: "trainingPrograms" });
  // TrainingProgram.belongsTo(ProfessionalFamily, { foreignKey: "professionalFamilyId", as: "professionalFamily" });
}
