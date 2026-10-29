import { SurveyAnswer } from "./survey-answer.model.js";
import { SurveyInvitation } from "../survey-invitation/survey-invitation.model.js";
import { SurveyQuestion } from "../survey-question/survey-question.model.js";

const includeSurveyQuestion = {
    model: SurveyQuestion,
    as: "question",
    attributes: ["id", "questionText"],
};

export class SurveyAnswerService {
    static async findAll() {
        return SurveyAnswer.findAll({
            include: [includeSurveyQuestion],
            order: [["id", "ASC"]],
        });
    }
    static async findById(id: number) {
        return SurveyAnswer.findByPk(id, {
            include: [includeSurveyQuestion],
        });
    }
    static async surveyInvitationExists(surveyInvitationId: number) {
        const surveyInvitation = await SurveyInvitation.findByPk(surveyInvitationId);
        return surveyInvitation !== null;
    }
    static async surveyQuestionExists(surveyQuestionId: number) {
        const surveyQuestion = await SurveyQuestion.findByPk(surveyQuestionId);
        return surveyQuestion !== null;
    }
    static async create(data: {
        invitationId: number;
        questionId: number;
        answerValue: string;
        answeredAt?: Date;
    }) {
        const surveyAnswer = await SurveyAnswer.create(data);
        return SurveyAnswerService.findById(surveyAnswer.id);
    }
    static async update(
        surveyAnswer: SurveyAnswer,
        data: {
            invitationId?: number;
            questionId?: number;
            answerValue?: string;
            answeredAt?: Date;
        }
    ) {
        await surveyAnswer.update(data);
        return SurveyAnswerService.findById(surveyAnswer.id);
    }
    static async delete(surveyAnswer: SurveyAnswer) {
        await surveyAnswer.destroy();
    }
}
