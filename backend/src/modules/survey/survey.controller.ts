import type { Request, Response, NextFunction } from "express";
import { SurveyService } from "./survey.service.js";

export class SurveyController {
    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const surveys = await SurveyService.findAll();
            res.json(surveys);
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
            const survey = await SurveyService.findById(id);
            if (!survey) {
                res.status(404).json({
                    message: "Survey not found",
                });
                return;
            }
            res.json(survey);
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
            const { title, description, isActive } = req.body;
            if (title === undefined) {
                res.status(400).json({
                    message: "title is required",
                });
                return;
            }
            const survey = await SurveyService.create({
                title,
                description,
                isActive,
            });
            res.status(201).json(survey);
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
            const survey = await SurveyService.findById(id);
            if (!survey) {
                res.status(404).json({
                    message: "Survey not found",
                });
                return;
            }
            const { title, description, isActive } = req.body;
            const updatedSurvey = await SurveyService.update(survey, {
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(isActive !== undefined && { isActive }),
            });
            res.json(updatedSurvey);
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
            const survey = await SurveyService.findById(id);
            if (!survey) {
                res.status(404).json({
                    message: "Survey not found",
                });
                return;
            }
            await SurveyService.delete(survey);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
