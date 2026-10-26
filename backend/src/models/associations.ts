import { AcademicYear } from "../modules/academic-year/academic-year.model.js";
import { Skill } from "../modules/skill/skill.model.js";
import { Student } from "../modules/student/student.model.js";
import { StudentEnrollment } from "../modules/student-enrollment/student-enrollment.model.js";
import { StudentInterest } from "../modules/student-interest/student-interest.model.js";
import { StudentSkill } from "../modules/student-skill/student-skill.model.js";

import { User } from '../../src/modules/user/user.model';
import { Role } from '../../src/modules/role/role.model';
import { Permission } from '../../src/modules/permission/permission.model';
import { UserRole } from '../../src/modules/user-role/user-role.model';
import { RolePermission } from '../../src/modules/role-permission/role-permission.model';
import { AuthToken } from '../../src/modules/auth-token/auth-token.model';
import { AuditLog } from '../../src/modules/audit-log/audit-log.model';

export function defineAssociations() {
  console.log("Associations defined");

  // 1:N Student -> StudentEnrollment
  Student.hasMany(StudentEnrollment, { foreignKey: "studentId", as: "enrollments", onDelete: "CASCADE" });
  StudentEnrollment.belongsTo(Student, { foreignKey: "studentId", as: "student" });

  // 1:N TrainingProgram -> StudentEnrollment
  // The FK is called programId in the ERD.
  // TrainingProgram.hasMany(StudentEnrollment, { foreignKey: "programId", as: "enrollments" });
  // StudentEnrollment.belongsTo(TrainingProgram, { foreignKey: "programId", as: "trainingProgram" });

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

  //------ Kacper
  
  // User - Role (N:M)
  User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId', otherKey: 'roleId', as: 'roles' });
  Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId', otherKey: 'userId', as: 'users' });

  // Role - Permission (N:M)
  Role.belongsToMany(Permission, {
    through: RolePermission,
    foreignKey: 'roleId',
    otherKey: 'permissionId',
    as: 'permissions',
  });
  Permission.belongsToMany(Role, {
    through: RolePermission,
    foreignKey: 'permissionId',
    otherKey: 'roleId',
    as: 'roles',
  });

  // User - AuthToken (1:N)
  User.hasMany(AuthToken, { foreignKey: 'userId', as: 'authTokens' });
  AuthToken.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  // User - AuditLog (1:N)
  User.hasMany(AuditLog, { foreignKey: 'userId', as: 'auditLogs' });
  AuditLog.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  }