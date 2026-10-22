import type { Request, Response, NextFunction } from "express";
import { ConsentRequestService } from "./consent-request.service.js";

export class ConsentRequestController {
    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const consentRequests = await ConsentRequestService.findAll();
            res.json(consentRequests);
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
            const consentRequest = await ConsentRequestService.findById(id);
            if (!consentRequest) {
                res.status(404).json({
                    message: "Consent request not found",
                });
                return;
            }
            res.json(consentRequest);
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
            const { studentId, sentById, tokenHash, sentAt, expiresAt, usedAt } = req.body;
            if (studentId === undefined || sentById === undefined || tokenHash === undefined || expiresAt === undefined) {
                res.status(400).json({
                    message: "studentId, sentById, tokenHash and expiresAt are required",
                });
                return;
            }
            if (await ConsentRequestService.tokenHashExists(tokenHash)) {
                res.status(409).json({
                    message: "A consent request with this tokenHash already exists",
                });
                return;
            }
            if (!(await ConsentRequestService.studentExists(Number(studentId)))) {
                res.status(400).json({
                    message: "Student not found",
                });
                return;
            }
            // TODO: descomentar cuando exista el modelo User
            // if (!(await ConsentRequestService.userExists(Number(sentById)))) {
            //     res.status(400).json({
            //         message: "User not found",
            //     });
            //     return;
            // }
            const consentRequest = await ConsentRequestService.create({
                studentId: Number(studentId),
                sentById: Number(sentById),
                tokenHash,
                ...(sentAt !== undefined && { sentAt: new Date(sentAt) }),
                expiresAt: new Date(expiresAt),
                ...(usedAt !== undefined && { usedAt: usedAt === null ? null : new Date(usedAt) }),
            });
            res.status(201).json(consentRequest);
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
            const consentRequest = await ConsentRequestService.findById(id);
            if (!consentRequest) {
                res.status(404).json({
                    message: "Consent request not found",
                });
                return;
            }
            const { studentId, sentById, tokenHash, sentAt, expiresAt, usedAt } = req.body;
            if (tokenHash !== undefined && tokenHash !== consentRequest.tokenHash) {
                if (await ConsentRequestService.tokenHashExists(tokenHash)) {
                    res.status(409).json({
                        message: "A consent request with this tokenHash already exists",
                    });
                    return;
                }
            }
            if (
                studentId !== undefined &&
                !(await ConsentRequestService.studentExists(Number(studentId)))
            ) {
                res.status(400).json({
                    message: "Student not found",
                });
                return;
            }
            // TODO: descomentar cuando exista el modelo User
            // if (
            //     sentById !== undefined &&
            //     !(await ConsentRequestService.userExists(Number(sentById)))
            // ) {
            //     res.status(400).json({
            //         message: "User not found",
            //     });
            //     return;
            // }
            const updatedConsentRequest = await ConsentRequestService.update(consentRequest, {
                ...(studentId !== undefined && { studentId: Number(studentId) }),
                ...(sentById !== undefined && { sentById: Number(sentById) }),
                ...(tokenHash !== undefined && { tokenHash }),
                ...(sentAt !== undefined && { sentAt: new Date(sentAt) }),
                ...(expiresAt !== undefined && { expiresAt: new Date(expiresAt) }),
                ...(usedAt !== undefined && { usedAt: usedAt === null ? null : new Date(usedAt) }),
            });
            res.json(updatedConsentRequest);
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
            const consentRequest = await ConsentRequestService.findById(id);
            if (!consentRequest) {
                res.status(404).json({
                    message: "Consent request not found",
                });
                return;
            }
            await ConsentRequestService.delete(consentRequest);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
