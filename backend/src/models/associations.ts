
import { Company } from "../modules/company/company.model.js";
import { Internship } from "../modules/internship/internship.model.js";
import { EmploymentRecord } from "../modules/employment-record/employment-record.model.js";
import { ConsentRequest } from "../modules/consent-request/consent-request.model.js";
import { Consent } from "../modules/consent/consent.model.js";
import { Survey } from "../modules/survey/survey.model.js";
import { SurveyQuestion } from "../modules/survey-question/survey-question.model.js";
import { SurveyInvitation } from "../modules/survey-invitation/survey-invitation.model.js";
import { SurveyAnswer } from "../modules/survey-answer/survey-answer.model.js";

import { AcademicYear } from "../modules/academic-year/academic-year.model.js";
import { Skill } from "../modules/skill/skill.model.js";
import { Student } from "../modules/student/student.model.js";
import { StudentEnrollment } from "../modules/student-enrollment/student-enrollment.model.js";
import { StudentInterest } from "../modules/student-interest/student-interest.model.js";
import { StudentSkill } from "../modules/student-skill/student-skill.model.js";

import { User } from "../modules/user/user.model.js";
import { Role } from "../modules/role/role.model.js";
import { Permission } from "../modules/permission/permission.model.js";
import { UserRole } from "../modules/user-role/user-role.model.js";
import { RolePermission } from "../modules/role-permission/role-permission.model.js";
import { AuthToken } from "../modules/auth-token/auth-token.model.js";
import { AuditLog } from "../modules/audit-log/audit-log.model.js";


/* TODO: uncomment when these models are implemented (their files are still empty).

 import { User } from "../modules/user/user.model.js";
 import { TrainingProgram } from "../modules/training-program/training-program.model.js";
 import { EducationalCenter } from "../modules/educational-center/educational-center.model.js";
 import { ProfessionalFamily } from "../modules/professional-family/professional-family.model.js";

*/
export function defineAssociations() {
  console.log("Associations defined");


  // ENPLOYABILITY

  StudentEnrollment.hasMany(Internship, { foreignKey: "enrollmentId", as: "internships", onDelete: "CASCADE" }); //1:N
  Internship.belongsTo(StudentEnrollment, { foreignKey: "enrollmentId", as: "enrollment" }); //N:1

  Company.hasMany(Internship, { foreignKey: "companyId", as: "internships", onDelete: "RESTRICT" }); //1:N
  Internship.belongsTo(Company, { foreignKey: "companyId", as: "company" }); //N:1

  Student.hasMany(EmploymentRecord, { foreignKey: "studentId", as: "employmentRecords", onDelete: "CASCADE" }); //1:N
  EmploymentRecord.belongsTo(Student, { foreignKey: "studentId", as: "student" }); //N:1

  Company.hasMany(EmploymentRecord, { foreignKey: "companyId", as: "employmentRecords", onDelete: "RESTRICT" }); //1:N
  EmploymentRecord.belongsTo(Company, { foreignKey: "companyId", as: "company" }); //N:1

  // FK opcional (internshipId can be null): with SET NULL, if you delete the internship, the employment record is kept and its internshipId becomes NULL.
  Internship.hasMany(EmploymentRecord, { foreignKey: "internshipId", as: "employmentRecords", onDelete: "SET NULL" }); //0..1:N
  EmploymentRecord.belongsTo(Internship, { foreignKey: "internshipId", as: "internship" }); //N:0..1

  // CONSENT

  Student.hasMany(ConsentRequest, { foreignKey: "studentId", as: "consentRequests", onDelete: "CASCADE" }); //1:N
  ConsentRequest.belongsTo(Student, { foreignKey: "studentId", as: "student" }); //N:1

  // TODO: descomentar cuando exista el modelo User (user.model.ts sigue vacío).
  // La FK se llama sentById (el usuario que envía la solicitud), no userId.
  // User.hasMany(ConsentRequest, { foreignKey: "sentById", as: "sentConsentRequests", onDelete: "RESTRICT" }); //1:N
  // ConsentRequest.belongsTo(User, { foreignKey: "sentById", as: "sentBy" }); //N:1

  // FK opcional (consentRequestId puede ser null), igual que internshipId
  ConsentRequest.hasMany(Consent, { foreignKey: "consentRequestId", as: "consents", onDelete: "SET NULL" }); //0..1:N
  Consent.belongsTo(ConsentRequest, { foreignKey: "consentRequestId", as: "consentRequest" }); //N:0..1

  Student.hasMany(Consent, { foreignKey: "studentId", as: "consents", onDelete: "CASCADE" }); //1:N
  Consent.belongsTo(Student, { foreignKey: "studentId", as: "student" }); //N:1

  // FORMS

  Survey.hasMany(SurveyQuestion, { foreignKey: "surveyId", as: "questions", onDelete: "CASCADE" }); //1:N
  SurveyQuestion.belongsTo(Survey, { foreignKey: "surveyId", as: "survey" }); //N:1

  Survey.hasMany(SurveyInvitation, { foreignKey: "surveyId", as: "invitations", onDelete: "CASCADE" }); //1:N
  SurveyInvitation.belongsTo(Survey, { foreignKey: "surveyId", as: "survey" }); //N:1

  Student.hasMany(SurveyInvitation, { foreignKey: "studentId", as: "surveyInvitations", onDelete: "CASCADE" }); //1:N
  SurveyInvitation.belongsTo(Student, { foreignKey: "studentId", as: "student" }); //N:1

  SurveyInvitation.hasMany(SurveyAnswer, { foreignKey: "invitationId", as: "answers", onDelete: "CASCADE" }); //1:N
  SurveyAnswer.belongsTo(SurveyInvitation, { foreignKey: "invitationId", as: "invitation" }); //N:1

  SurveyQuestion.hasMany(SurveyAnswer, { foreignKey: "questionId", as: "answers", onDelete: "CASCADE" }); //1:N
  SurveyAnswer.belongsTo(SurveyQuestion, { foreignKey: "questionId", as: "question" }); //N:1



  // 1:N Student -> StudentEnrollment
  Student.hasMany(StudentEnrollment, { foreignKey: "studentId", as: "enrollments", onDelete: "CASCADE" });
  StudentEnrollment.belongsTo(Student, { foreignKey: "studentId", as: "student" });

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

