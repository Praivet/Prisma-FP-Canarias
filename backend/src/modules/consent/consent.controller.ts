import type { Request, Response, NextFunction } from "express";
import { ConsentService } from "./consent.service.js";

const CONSENT_STATUSES = ["granted", "denied", "revoked"];

export class ConsentController {
    static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const consents = await ConsentService.findAll();
            res.json(consents);
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
            const consent = await ConsentService.findById(id);
            if (!consent) {
                res.status(404).json({
                    message: "Consent not found",
                });
                return;
            }
            res.json(consent);
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
            const { studentId, consentRequestId, purpose, status, policyVersion, recordedAt } = req.body;
            if (studentId === undefined || purpose === undefined || status === undefined || policyVersion === undefined) {
                res.status(400).json({
                    message: "studentId, purpose, status and policyVersion are required",
                });
                return;
            }
            if (!CONSENT_STATUSES.includes(status)) {
                res.status(400).json({
                    message: `status must be one of: ${CONSENT_STATUSES.join(", ")}`,
                });
                return;
            }
            if (!(await ConsentService.studentExists(Number(studentId)))) {
                res.status(400).json({
                    message: "Student not found",
                });
                return;
            }
            // La FK es opcional: solo se comprueba si viene con valor
            if (
                consentRequestId !== undefined &&
                consentRequestId !== null &&
                !(await ConsentService.consentRequestExists(Number(consentRequestId)))
            ) {
                res.status(400).json({
                    message: "Consent request not found",
                });
                return;
            }
            const consent = await ConsentService.create({
                studentId: Number(studentId),
                ...(consentRequestId !== undefined && { consentRequestId: consentRequestId === null ? null : Number(consentRequestId) }),
                purpose,
                status,
                policyVersion,
                ...(recordedAt !== undefined && { recordedAt: new Date(recordedAt) }),
            });
            res.status(201).json(consent);
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
            const consent = await ConsentService.findById(id);
            if (!consent) {
                res.status(404).json({
                    message: "Consent not found",
                });
                return;
            }
            const { studentId, consentRequestId, purpose, status, policyVersion, recordedAt } = req.body;
            if (status !== undefined && !CONSENT_STATUSES.includes(status)) {
                res.status(400).json({
                    message: `status must be one of: ${CONSENT_STATUSES.join(", ")}`,
                });
                return;
            }
            if (
                studentId !== undefined &&
                !(await ConsentService.studentExists(Number(studentId)))
            ) {
                res.status(400).json({
                    message: "Student not found",
                });
                return;
            }
            if (
                consentRequestId !== undefined &&
                consentRequestId !== null &&
                !(await ConsentService.consentRequestExists(Number(consentRequestId)))
            ) {
                res.status(400).json({
                    message: "Consent request not found",
                });
                return;
            }
            const updatedConsent = await ConsentService.update(consent, {
                ...(studentId !== undefined && { studentId: Number(studentId) }),
                ...(consentRequestId !== undefined && { consentRequestId: consentRequestId === null ? null : Number(consentRequestId) }),
                ...(purpose !== undefined && { purpose }),
                ...(status !== undefined && { status }),
                ...(policyVersion !== undefined && { policyVersion }),
                ...(recordedAt !== undefined && { recordedAt: new Date(recordedAt) }),
            });
            res.json(updatedConsent);
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
            const consent = await ConsentService.findById(id);
            if (!consent) {
                res.status(404).json({
                    message: "Consent not found",
                });
                return;
            }
            await ConsentService.delete(consent);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
