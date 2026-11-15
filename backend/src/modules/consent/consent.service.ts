import { Consent } from "./consent.model.js";
import { Student } from "../student/student.model.js";
import { ConsentRequest } from "../consent-request/consent-request.model.js";

type ConsentStatus = "granted" | "denied" | "revoked";

const includeStudent = {
    model: Student,
    as: "student",
    attributes: ["id", "firstName", "lastName"],
};

export class ConsentService {
    static async findAll() {
        return Consent.findAll({
            include: [includeStudent],
            order: [["id", "ASC"]],
        });
    }
    static async findById(id: number) {
        return Consent.findByPk(id, {
            include: [includeStudent],
        });
    }
    static async studentExists(studentId: number) {
        const student = await Student.findByPk(studentId);
        return student !== null;
    }
    static async consentRequestExists(consentRequestId: number) {
        const consentRequest = await ConsentRequest.findByPk(consentRequestId);
        return consentRequest !== null;
    }
    static async create(data: {
        studentId: number;
        consentRequestId?: number | null;
        purpose: string;
        status: ConsentStatus;
        policyVersion: string;
        recordedAt?: Date;
    }) {
        const consent = await Consent.create(data);
        return ConsentService.findById(consent.id);
    }
    static async update(
        consent: Consent,
        data: {
            studentId?: number;
            consentRequestId?: number | null;
            purpose?: string;
            status?: ConsentStatus;
            policyVersion?: string;
            recordedAt?: Date;
        }
    ) {
        await consent.update(data);
        return ConsentService.findById(consent.id);
    }
    static async delete(consent: Consent) {
        await consent.destroy();
    }
}
