import type { Request, Response, NextFunction } from "express";
import { SurveyAnswerService } from "./survey-answer.service.js";

export class SurveyAnswerController {
    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const surveyAnswers = await SurveyAnswerService.findAll();
            res.json(surveyAnswers);
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
            const surveyAnswer = await SurveyAnswerService.findById(id);
            if (!surveyAnswer) {
                res.status(404).json({
                    message: "Survey answer not found",
                });
                return;
            }
            res.json(surveyAnswer);
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
            const { invitationId, questionId, answerValue, answeredAt } = req.body;
            if (invitationId === undefined || questionId === undefined || answerValue === undefined) {
                res.status(400).json({
                    message: "invitationId, questionId and answerValue are required",
                });
                return;
            }
            if (!(await SurveyAnswerService.surveyInvitationExists(Number(invitationId)))) {
                res.status(400).json({
                    message: "Survey invitation not found",
                });
                return;
            }
            if (!(await SurveyAnswerService.surveyQuestionExists(Number(questionId)))) {
                res.status(400).json({
                    message: "Survey question not found",
                });
                return;
            }
            const surveyAnswer = await SurveyAnswerService.create({
                invitationId: Number(invitationId),
                questionId: Number(questionId),
                answerValue,
                ...(answeredAt !== undefined && { answeredAt: new Date(answeredAt) }),
            });
            res.status(201).json(surveyAnswer);
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
            const surveyAnswer = await SurveyAnswerService.findById(id);
            if (!surveyAnswer) {
                res.status(404).json({
                    message: "Survey answer not found",
                });
                return;
            }
            const { invitationId, questionId, answerValue, answeredAt } = req.body;
            if (
                invitationId !== undefined &&
                !(await SurveyAnswerService.surveyInvitationExists(Number(invitationId)))
            ) {
                res.status(400).json({
                    message: "Survey invitation not found",
                });
                return;
            }
            if (
                questionId !== undefined &&
                !(await SurveyAnswerService.surveyQuestionExists(Number(questionId)))
            ) {
                res.status(400).json({
                    message: "Survey question not found",
                });
                return;
            }
            const updatedSurveyAnswer = await SurveyAnswerService.update(surveyAnswer, {
                ...(invitationId !== undefined && { invitationId: Number(invitationId) }),
                ...(questionId !== undefined && { questionId: Number(questionId) }),
                ...(answerValue !== undefined && { answerValue }),
                ...(answeredAt !== undefined && { answeredAt: new Date(answeredAt) }),
            });
            res.json(updatedSurveyAnswer);
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
            const surveyAnswer = await SurveyAnswerService.findById(id);
            if (!surveyAnswer) {
                res.status(404).json({
                    message: "Survey answer not found",
                });
                return;
            }
            await SurveyAnswerService.delete(surveyAnswer);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
