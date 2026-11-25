import { Permission } from "./permission.model.js";
export class PermissionService {
    static async findAll() {
        return Permission.findAll({
            order: [["id", "ASC"]],
        });
    }
    static async findById(id: number) {
        return Permission.findByPk(id);
    }
    static async create(data: {
        code: string;
        description?: string | null;
    }) {
        return Permission.create(data);
    }
    static async update(
        permission: Permission,
        data: {
            code?: string;
            description?: string | null;
        }
    ) {
        return permission.update(
            Object.fromEntries(
                Object.entries(data).filter(([, value]) => value !== undefined)
            )
        );
    }
    static async delete(permission: Permission) {
        await permission.destroy();
    }
}