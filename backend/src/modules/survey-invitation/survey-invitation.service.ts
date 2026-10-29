import { SurveyInvitation } from "./survey-invitation.model.js";
import { Survey } from "../survey/survey.model.js";
import { Student } from "../student/student.model.js";

const includeSurvey = {
    model: Survey,
    as: "survey",
    attributes: ["id", "title"],
};

export class SurveyInvitationService {
    static async findAll() {
        return SurveyInvitation.findAll({
            include: [includeSurvey],
            order: [["id", "ASC"]],
        });
    }
    static async findById(id: number) {
        return SurveyInvitation.findByPk(id, {
            include: [includeSurvey],
        });
    }
    static async surveyExists(surveyId: number) {
        const survey = await Survey.findByPk(surveyId);
        return survey !== null;
    }
    static async studentExists(studentId: number) {
        const student = await Student.findByPk(studentId);
        return student !== null;
    }
    static async tokenHashExists(tokenHash: string) {
        const surveyInvitation = await SurveyInvitation.findOne({ where: { tokenHash } });
        return surveyInvitation !== null;
    }
    static async create(data: {
        surveyId: number;
        studentId: number;
        tokenHash: string;
        sentAt?: Date;
        expiresAt: Date;
        completedAt?: Date | null;
    }) {
        const surveyInvitation = await SurveyInvitation.create(data);
        return SurveyInvitationService.findById(surveyInvitation.id);
    }
    static async update(
        surveyInvitation: SurveyInvitation,
        data: {
            surveyId?: number;
            studentId?: number;
            tokenHash?: string;
            sentAt?: Date;
            expiresAt?: Date;
            completedAt?: Date | null;
        }
    ) {
        await surveyInvitation.update(data);
        return SurveyInvitationService.findById(surveyInvitation.id);
    }
    static async delete(surveyInvitation: SurveyInvitation) {
        await surveyInvitation.destroy();
    }
}
