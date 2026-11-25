
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
import { TrainingProgram } from "../modules/training-program/training-program.model.js";
import { TutorAssignment } from "../modules/tutor-assignament/tutor-assignament.model.js";
import { ProfessionalFamily } from "../modules/professional-family/professional-family.model.js";
import { EducationalCenter } from "../modules/educational-center/educational-center.model.js";

import { User } from "../modules/auth/user.model.js";
import { Role } from "../modules/rbac/role.model.js";
import { Permission } from "../modules/rbac/permission.model.js";
import { UserRole } from "../modules/rbac/user-role.model.js";
import { RolePermission } from "../modules/rbac/role-permission.model.js";
import { AuthToken } from "../modules/auth-token/auth-token.model.js";
import { AuditLog } from "../modules/audit-log/audit-log.model.js";

export function defineAssociations() {
  console.log("Associations defined");

  StudentEnrollment.hasMany(Internship, { foreignKey: "enrollmentId", as: "internships", onDelete: "CASCADE" });
  Internship.belongsTo(StudentEnrollment, { foreignKey: "enrollmentId", as: "enrollment" });

  Company.hasMany(Internship, { foreignKey: "companyId", as: "internships", onDelete: "RESTRICT" });
  Internship.belongsTo(Company, { foreignKey: "companyId", as: "company" });

  Student.hasMany(EmploymentRecord, { foreignKey: "studentId", as: "employmentRecords", onDelete: "CASCADE" });
  EmploymentRecord.belongsTo(Student, { foreignKey: "studentId", as: "student" });

  Company.hasMany(EmploymentRecord, { foreignKey: "companyId", as: "employmentRecords", onDelete: "RESTRICT" });
  EmploymentRecord.belongsTo(Company, { foreignKey: "companyId", as: "company" });

  Internship.hasMany(EmploymentRecord, { foreignKey: "internshipId", as: "employmentRecords", onDelete: "SET NULL" });
  EmploymentRecord.belongsTo(Internship, { foreignKey: "internshipId", as: "internship" });

  Student.hasMany(ConsentRequest, { foreignKey: "studentId", as: "consentRequests", onDelete: "CASCADE" });
  ConsentRequest.belongsTo(Student, { foreignKey: "studentId", as: "student" });

  User.hasMany(ConsentRequest, { foreignKey: "sentById", as: "sentConsentRequests", onDelete: "RESTRICT" });
  ConsentRequest.belongsTo(User, { foreignKey: "sentById", as: "sentBy" });

  ConsentRequest.hasMany(Consent, { foreignKey: "consentRequestId", as: "consents", onDelete: "SET NULL" });
  Consent.belongsTo(ConsentRequest, { foreignKey: "consentRequestId", as: "consentRequest" });

  Student.hasMany(Consent, { foreignKey: "studentId", as: "consents", onDelete: "CASCADE" });
  Consent.belongsTo(Student, { foreignKey: "studentId", as: "student" });

  Survey.hasMany(SurveyQuestion, { foreignKey: "surveyId", as: "questions", onDelete: "CASCADE" });
  SurveyQuestion.belongsTo(Survey, { foreignKey: "surveyId", as: "survey" });

  Survey.hasMany(SurveyInvitation, { foreignKey: "surveyId", as: "invitations", onDelete: "CASCADE" });
  SurveyInvitation.belongsTo(Survey, { foreignKey: "surveyId", as: "survey" });

  Student.hasMany(SurveyInvitation, { foreignKey: "studentId", as: "surveyInvitations", onDelete: "CASCADE" });
  SurveyInvitation.belongsTo(Student, { foreignKey: "studentId", as: "student" });

  SurveyInvitation.hasMany(SurveyAnswer, { foreignKey: "invitationId", as: "answers", onDelete: "CASCADE" });
  SurveyAnswer.belongsTo(SurveyInvitation, { foreignKey: "invitationId", as: "invitation" });

  SurveyQuestion.hasMany(SurveyAnswer, { foreignKey: "questionId", as: "answers", onDelete: "CASCADE" });
  SurveyAnswer.belongsTo(SurveyQuestion, { foreignKey: "questionId", as: "question" });

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

  // 1:1 User -> Student (como Bicycle -> BicycleDetail). hasOne en el lado "padre",
  // belongsTo en el lado que tiene la FK. userId es unique en Student: por eso es 1:1 y no 1:N.
  User.hasOne(Student, { foreignKey: "userId", as: "student", onDelete: "CASCADE" });
  Student.belongsTo(User, { foreignKey: "userId", as: "user" });

  // 1:N TrainingProgram -> StudentEnrollment (FK programId en StudentEnrollment).
  TrainingProgram.hasMany(StudentEnrollment, { foreignKey: "programId", as: "enrollments" });
  StudentEnrollment.belongsTo(TrainingProgram, { foreignKey: "programId", as: "trainingProgram" });

  // TutorAssignment no es tabla intermedia: es una entidad con tres FKs, cada una de un 1:N.
  // 1:N TrainingProgram -> TutorAssignment
  TrainingProgram.hasMany(TutorAssignment, { foreignKey: "programId", as: "tutorAssignments" });
  TutorAssignment.belongsTo(TrainingProgram, { foreignKey: "programId", as: "trainingProgram" });

  // 1:N AcademicYear -> TutorAssignment
  AcademicYear.hasMany(TutorAssignment, { foreignKey: "academicYearId", as: "tutorAssignments" });
  TutorAssignment.belongsTo(AcademicYear, { foreignKey: "academicYearId", as: "academicYear" });

  // 1:N User -> TutorAssignment (el tutor es un usuario; la FK se llama tutorId, no userId).
  User.hasMany(TutorAssignment, { foreignKey: "tutorId", as: "tutorAssignments" });
  TutorAssignment.belongsTo(User, { foreignKey: "tutorId", as: "tutor" });

  // 1:N ProfessionalFamily -> TrainingProgram y EducationalCenter -> TrainingProgram.
  ProfessionalFamily.hasMany(TrainingProgram, { foreignKey: "familyId", as: "trainingPrograms" });
  TrainingProgram.belongsTo(ProfessionalFamily, { foreignKey: "familyId", as: "family" });

  EducationalCenter.hasMany(TrainingProgram, { foreignKey: "centerId", as: "trainingPrograms" });
  TrainingProgram.belongsTo(EducationalCenter, { foreignKey: "centerId", as: "center" });

  // REGLA DE ORO: el modelo que TIENE la FK hace belongsTo; el otro hace hasMany (1:N) o hasOne (1:1).
  // Las dos líneas llevan el mismo foreignKey. Alias: plural en hasMany, singular en belongsTo.
  // Esos alias son los que se usan luego en el "as" de los include.

  User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId', otherKey: 'roleId', as: 'roles' });
  Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId', otherKey: 'userId', as: 'users' });

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

  User.hasMany(AuthToken, { foreignKey: 'userId', as: 'authTokens' });
  AuthToken.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  User.hasMany(AuditLog, { foreignKey: 'userId', as: 'auditLogs' });
  AuditLog.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  }

