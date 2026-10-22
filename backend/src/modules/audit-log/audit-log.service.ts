import { AuditLog } from "./audit-log.model.js";
export class AuditLogService {
    static async findAll() {
        return AuditLog.findAll({
            order: [["id", "ASC"]],
        });
    }
    static async findById(id: number) {
        return AuditLog.findByPk(id);
    }
    static async create(data: {
        action: string;
        entityType: string;
        entityId: string;
        previousValues?: object | null;
        newValues?: object | null;
        createdAt?: Date;
    }) {
        return AuditLog.create(data);
    }
    static async update(
        auditLog: AuditLog,
        data: {
            action?: string;
            entityType?: string;
            entityId?: string;
            previousValues?: object | null;
            newValues?: object | null;
        }
    ) {
        return auditLog.update(
            Object.fromEntries(
                Object.entries(data).filter(([, value]) => value !== undefined)
            )
        );
    }
    static async delete(auditLog: AuditLog) {
        await auditLog.destroy();
    }
}