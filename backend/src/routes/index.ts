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

const router = Router();

router.use("/companies", companyRoutes);
router.use("/internships", internshipRoutes);
router.use("/employment-records", employmentRecordRoutes);
router.use("/consent-requests", consentRequestRoutes);
router.use("/consents", consentRoutes);
router.use("/surveys", surveyRoutes);
router.use("/survey-questions", surveyQuestionRoutes);
router.use("/survey-invitations", surveyInvitationRoutes);
router.use("/survey-answers", surveyAnswerRoutes);

export default router;
