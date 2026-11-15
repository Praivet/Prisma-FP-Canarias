import { Survey } from "./survey.model.js";

export class SurveyService {
    static async findAll() {
        return Survey.findAll({
            order: [["id", "ASC"]],
        });
    }
    static async findById(id: number) {
        return Survey.findByPk(id);
    }
    static async create(data: {
        title: string;
        description?: string | null;
        isActive?: boolean;
    }) {
        const survey = await Survey.create(data);
        return SurveyService.findById(survey.id);
    }
    static async update(
        survey: Survey,
        data: {
            title?: string;
            description?: string | null;
            isActive?: boolean;
        }
    ) {
        await survey.update(data);
        return SurveyService.findById(survey.id);
    }
    static async delete(survey: Survey) {
        await survey.destroy();
    }
}
