import { SurveyQuestion } from "./survey-question.model.js";
import { Survey } from "../survey/survey.model.js";

type QuestionType = "text" | "number" | "scale" | "boolean";

const includeSurvey = {
    model: Survey,
    as: "survey",
    attributes: ["id", "title"],
};

export class SurveyQuestionService {
    static async findAll() {
        return SurveyQuestion.findAll({
            include: [includeSurvey],
            order: [["id", "ASC"]],
        });
    }
    static async findById(id: number) {
        return SurveyQuestion.findByPk(id, {
            include: [includeSurvey],
        });
    }
    static async surveyExists(surveyId: number) {
        const survey = await Survey.findByPk(surveyId);
        return survey !== null;
    }
    static async create(data: {
        surveyId: number;
        questionText: string;
        questionType: QuestionType;
        sortOrder?: number;
        isRequired?: boolean;
    }) {
        const surveyQuestion = await SurveyQuestion.create(data);
        return SurveyQuestionService.findById(surveyQuestion.id);
    }
    static async update(
        surveyQuestion: SurveyQuestion,
        data: {
            surveyId?: number;
            questionText?: string;
            questionType?: QuestionType;
            sortOrder?: number;
            isRequired?: boolean;
        }
    ) {
        await surveyQuestion.update(data);
        return SurveyQuestionService.findById(surveyQuestion.id);
    }
    static async delete(surveyQuestion: SurveyQuestion) {
        await surveyQuestion.destroy();
    }
}
