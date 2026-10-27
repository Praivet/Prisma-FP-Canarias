import type { Request, Response, NextFunction } from "express";
import { SurveyQuestionService } from "./survey-question.service.js";

const QUESTION_TYPES = ["text", "number", "scale", "boolean"];

export class SurveyQuestionController {
    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const surveyQuestions = await SurveyQuestionService.findAll();
            res.json(surveyQuestions);
        } catch (error) {
            next(error);
        }
    }
    static async getById(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);
            const surveyQuestion = await SurveyQuestionService.findById(id);
            if (!surveyQuestion) {
                res.status(404).json({
                    message: "Survey question not found",
                });
                return;
            }
            res.json(surveyQuestion);
        } catch (error) {
            next(error);
        }
    }
    static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { surveyId, questionText, questionType, sortOrder, isRequired } = req.body;
            if (surveyId === undefined || questionText === undefined || questionType === undefined) {
                res.status(400).json({
                    message: "surveyId, questionText and questionType are required",
                });
                return;
            }
            if (!QUESTION_TYPES.includes(questionType)) {
                res.status(400).json({
                    message: `questionType must be one of: ${QUESTION_TYPES.join(", ")}`,
                });
                return;
            }
            if (!(await SurveyQuestionService.surveyExists(Number(surveyId)))) {
                res.status(400).json({
                    message: "Survey not found",
                });
                return;
            }
            const surveyQuestion = await SurveyQuestionService.create({
                surveyId: Number(surveyId),
                questionText,
                questionType,
                sortOrder,
                isRequired,
            });
            res.status(201).json(surveyQuestion);
        } catch (error) {
            next(error);
        }
    }
    static async update(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);
            const surveyQuestion = await SurveyQuestionService.findById(id);
            if (!surveyQuestion) {
                res.status(404).json({
                    message: "Survey question not found",
                });
                return;
            }
            const { surveyId, questionText, questionType, sortOrder, isRequired } = req.body;
            if (questionType !== undefined && !QUESTION_TYPES.includes(questionType)) {
                res.status(400).json({
                    message: `questionType must be one of: ${QUESTION_TYPES.join(", ")}`,
                });
                return;
            }
            if (
                surveyId !== undefined &&
                !(await SurveyQuestionService.surveyExists(Number(surveyId)))
            ) {
                res.status(400).json({
                    message: "Survey not found",
                });
                return;
            }
            const updatedSurveyQuestion = await SurveyQuestionService.update(surveyQuestion, {
                ...(surveyId !== undefined && { surveyId: Number(surveyId) }),
                ...(questionText !== undefined && { questionText }),
                ...(questionType !== undefined && { questionType }),
                ...(sortOrder !== undefined && { sortOrder }),
                ...(isRequired !== undefined && { isRequired }),
            });
            res.json(updatedSurveyQuestion);
        } catch (error) {
            next(error);
        }
    }
    static async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);
            const surveyQuestion = await SurveyQuestionService.findById(id);
            if (!surveyQuestion) {
                res.status(404).json({
                    message: "Survey question not found",
                });
                return;
            }
            await SurveyQuestionService.delete(surveyQuestion);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
