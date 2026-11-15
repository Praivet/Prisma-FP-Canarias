import type { Request, Response, NextFunction } from "express";
import { SurveyInvitationService } from "./survey-invitation.service.js";

export class SurveyInvitationController {
    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const surveyInvitations = await SurveyInvitationService.findAll();
            res.json(surveyInvitations);
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
            const surveyInvitation = await SurveyInvitationService.findById(id);
            if (!surveyInvitation) {
                res.status(404).json({
                    message: "Survey invitation not found",
                });
                return;
            }
            res.json(surveyInvitation);
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
            const { surveyId, studentId, tokenHash, sentAt, expiresAt, completedAt } = req.body;
            if (surveyId === undefined || studentId === undefined || tokenHash === undefined || expiresAt === undefined) {
                res.status(400).json({
                    message: "surveyId, studentId, tokenHash and expiresAt are required",
                });
                return;
            }
            if (await SurveyInvitationService.tokenHashExists(tokenHash)) {
                res.status(409).json({
                    message: "A survey invitation with this tokenHash already exists",
                });
                return;
            }
            if (!(await SurveyInvitationService.surveyExists(Number(surveyId)))) {
                res.status(400).json({
                    message: "Survey not found",
                });
                return;
            }
            if (!(await SurveyInvitationService.studentExists(Number(studentId)))) {
                res.status(400).json({
                    message: "Student not found",
                });
                return;
            }
            const surveyInvitation = await SurveyInvitationService.create({
                surveyId: Number(surveyId),
                studentId: Number(studentId),
                tokenHash,
                ...(sentAt !== undefined && { sentAt: new Date(sentAt) }),
                expiresAt: new Date(expiresAt),
                ...(completedAt !== undefined && { completedAt: completedAt === null ? null : new Date(completedAt) }),
            });
            res.status(201).json(surveyInvitation);
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
            const surveyInvitation = await SurveyInvitationService.findById(id);
            if (!surveyInvitation) {
                res.status(404).json({
                    message: "Survey invitation not found",
                });
                return;
            }
            const { surveyId, studentId, tokenHash, sentAt, expiresAt, completedAt } = req.body;
            if (tokenHash !== undefined && tokenHash !== surveyInvitation.tokenHash) {
                if (await SurveyInvitationService.tokenHashExists(tokenHash)) {
                    res.status(409).json({
                        message: "A survey invitation with this tokenHash already exists",
                    });
                    return;
                }
            }
            if (
                surveyId !== undefined &&
                !(await SurveyInvitationService.surveyExists(Number(surveyId)))
            ) {
                res.status(400).json({
                    message: "Survey not found",
                });
                return;
            }
            if (
                studentId !== undefined &&
                !(await SurveyInvitationService.studentExists(Number(studentId)))
            ) {
                res.status(400).json({
                    message: "Student not found",
                });
                return;
            }
            const updatedSurveyInvitation = await SurveyInvitationService.update(surveyInvitation, {
                ...(surveyId !== undefined && { surveyId: Number(surveyId) }),
                ...(studentId !== undefined && { studentId: Number(studentId) }),
                ...(tokenHash !== undefined && { tokenHash }),
                ...(sentAt !== undefined && { sentAt: new Date(sentAt) }),
                ...(expiresAt !== undefined && { expiresAt: new Date(expiresAt) }),
                ...(completedAt !== undefined && { completedAt: completedAt === null ? null : new Date(completedAt) }),
            });
            res.json(updatedSurveyInvitation);
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
            const surveyInvitation = await SurveyInvitationService.findById(id);
            if (!surveyInvitation) {
                res.status(404).json({
                    message: "Survey invitation not found",
                });
                return;
            }
            await SurveyInvitationService.delete(surveyInvitation);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
