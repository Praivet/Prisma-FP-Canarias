import { ConsentRequest } from "./consent-request.model.js";
import { Student } from "../student/student.model.js";
// TODO: descomentar cuando el modelo User esté hecho (user.model.ts sigue vacío)
// import { User } from "../user/user.model.js";

const includeStudent = {
    model: Student,
    as: "student",
    attributes: ["id", "firstName", "lastName"],
};

export class ConsentRequestService {
    static async findAll() {
        return ConsentRequest.findAll({
            include: [includeStudent],
            order: [["id", "ASC"]],
        });
    }
    static async findById(id: number) {
        return ConsentRequest.findByPk(id, {
            include: [includeStudent],
        });
    }
    static async studentExists(studentId: number) {
        const student = await Student.findByPk(studentId);
        return student !== null;
    }
    // TODO: descomentar cuando exista User
    // static async userExists(userId: number) {
    //     const user = await User.findByPk(userId);
    //     return user !== null;
    // }
    static async tokenHashExists(tokenHash: string) {
        const consentRequest = await ConsentRequest.findOne({ where: { tokenHash } });
        return consentRequest !== null;
    }
    static async create(data: {
        studentId: number;
        sentById: number;
        tokenHash: string;
        sentAt?: Date;
        expiresAt: Date;
        usedAt?: Date | null;
    }) {
        const consentRequest = await ConsentRequest.create(data);
        return ConsentRequestService.findById(consentRequest.id);
    }
    static async update(
        consentRequest: ConsentRequest,
        data: {
            studentId?: number;
            sentById?: number;
            tokenHash?: string;
            sentAt?: Date;
            expiresAt?: Date;
            usedAt?: Date | null;
        }
    ) {
        await consentRequest.update(data);
        return ConsentRequestService.findById(consentRequest.id);
    }
    static async delete(consentRequest: ConsentRequest) {
        await consentRequest.destroy();
    }
}
