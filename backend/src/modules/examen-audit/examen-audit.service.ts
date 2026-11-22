import { ExamenAudit } from "./examen-audit.model.js";
import { Company } from "../company/company.model.js";

const includeCompany = {
    model: Company,
    as: "company",
    attributes: ["id", "name"],
};

export class ExamenAuditService {
    static async findAll() {
        return ExamenAudit.findAll({
            include: [includeCompany],
            order: [["id", "ASC"]],
        });
    }
    static async findById(id: number) {
        return ExamenAudit.findByPk(id, {
            include: [includeCompany],
        });
    }
    // Consulta del examen: solo los registros cuya operation es CREATE
    static async findOperationCreate() {
        return ExamenAudit.findAll({
            where: { operation: "CREATE" },
            include: [includeCompany],
            order: [["id", "ASC"]],
        });
    }
    static async companyExists(companyId: number) {
        const company = await Company.findByPk(companyId);
        return company !== null;
    }
    static async create(data: {
        companyId: number;
        description: string;
        operation?: "CREATE" | "MODIFY" | "READ" | null;
    }) {
        const examenAudit = await ExamenAudit.create(data);
        return ExamenAuditService.findById(examenAudit.id);
    }
    static async update(
        examenAudit: ExamenAudit,
        data: {
            companyId?: number;
            description?: string;
            operation?: "CREATE" | "MODIFY" | "READ" | null;
        }
    ) {
        await examenAudit.update(data);
        return ExamenAuditService.findById(examenAudit.id);
    }
    static async delete(examenAudit: ExamenAudit) {
        await examenAudit.destroy();
    }
}
