import { Router } from "express";

import companyRoutes from "../modules/company/company.routes";
import internshipRoutes from "../modules/internship/internship.routes";
import employmentRecordRoutes from "../modules/employment-record/employment-record.routes";
import consentRequestRoutes from "../modules/consent-request/consent-request.routes";
import consentRoutes from "../modules/consent/consent.routes";
import surveyRoutes from "../modules/survey/survey.routes";
import surveyQuestionRoutes from "../modules/survey-question/survey-question.routes";
import surveyInvitationRoutes from "../modules/survey-invitation/survey-invitation.routes";
import surveyAnswerRoutes from "../modules/survey-answer/survey-answer.routes";

  
import academicYearRoutes from "../modules/academic-year/academic-year.routes";
import skillRoutes from "../modules/skill/skill.routes";
import studentRoutes from "../modules/student/student.routes";
import studentEnrollmentRoutes from "../modules/student-enrollment/student-enrollment.routes";
import studentInterestRoutes from "../modules/student-interest/student-interest.routes";
import studentSkillRoutes from "../modules/student-skill/student-skill.routes";
import trainingProgramRoutes from "../modules/training-program/training-program.routes";
import tutorAssignmentRoutes from "../modules/tutor-assignament/tutor-assignament.routes";

import userRoutes from "../../src/modules/user/user.routes";
import roleRoutes from "../../src/modules/role/role.routes";
import permissionRoutes from "../../src/modules/permission/permission.routes";
import userRoleRoutes from "../../src/modules/user-role/user-role.routes";
import rolePermissionRoutes from "../../src/modules/role-permission/role-permission.routes";
import authTokenRoutes from "../../src/modules/auth-token/auth-token.routes";
import auditLogRoutes from "../../src/modules/audit-log/audit-log.routes";
import educationalCenterRoutes from "../../src/modules/educational-center/educational-center.routes";
import professionalFamilyRoutes from "../../src/modules/professional-family/professional-family.routes";

const router = Router();
// Every new module must be mounted here (and its model imported in associations.ts).
router.use("/academic-years", academicYearRoutes);
router.use("/skills", skillRoutes);
router.use("/students", studentRoutes);
router.use("/student-enrollments", studentEnrollmentRoutes);
router.use("/student-interests", studentInterestRoutes);
router.use("/student-skills", studentSkillRoutes);
router.use("/training-programs", trainingProgramRoutes);
router.use("/tutor-assignments", tutorAssignmentRoutes);



router.use("/companies", companyRoutes);
router.use("/internships", internshipRoutes);
router.use("/employment-records", employmentRecordRoutes);
router.use("/consent-requests", consentRequestRoutes);
router.use("/consents", consentRoutes);
router.use("/surveys", surveyRoutes);
router.use("/survey-questions", surveyQuestionRoutes);
router.use("/survey-invitations", surveyInvitationRoutes);
router.use("/survey-answers", surveyAnswerRoutes);






router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);
router.use("/user-roles", userRoleRoutes);
router.use("/role-permissions", rolePermissionRoutes);
router.use("/auth-tokens", authTokenRoutes);
router.use("/audit-logs", auditLogRoutes);
router.use("/educational-centers", educationalCenterRoutes);
router.use("/professional-families", professionalFamilyRoutes);

export default router;

