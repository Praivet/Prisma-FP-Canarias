import { UserRole } from "./user-role.model.js";
export class UserRoleService {
    static async findAll() {
        return UserRole.findAll({
            order: [["userId", "ASC"], ["roleId", "ASC"]],
        });
    }
    static async findById(userId: number, roleId: number) {
        return UserRole.findOne({ where: { userId, roleId } });
    }
    static async create(data: {
        userId: number;
        roleId: number;
        assignedAt?: Date;
    }) {
        return UserRole.create(data);
    }
    static async update(
        userRole: UserRole,
        data: {
            assignedAt?: Date;
        }
    ) {
        return userRole.update(
            Object.fromEntries(
                Object.entries(data).filter(([, value]) => value !== undefined)
            )
        );
    }
    static async delete(userRole: UserRole) {
        await userRole.destroy();
    }
}