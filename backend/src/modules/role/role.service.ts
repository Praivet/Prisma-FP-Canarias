import { Role } from "./role.model.js";

export class RoleService {
    static async findAll() {
        return Role.findAll({
            order: [["id", "ASC"]],
        });
    }
    static async findById(id: number) {
        return Role.findByPk(id);
    }
    static async create(data: {
        name: string;
        description?: string | null;
    }) {
        return Role.create(data);
    }
    static async update(
        role: Role,
        data: {
            name?: string;
            description?: string | null;
        }
    ) {
        return role.update(
            Object.fromEntries(
                Object.entries(data).filter(([, value]) => value !== undefined)
            )
        );
    }
    static async delete(role: Role) {
        await role.destroy();
    }
}