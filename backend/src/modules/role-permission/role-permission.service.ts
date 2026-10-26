import { RolePermission } from "./role-permission.model.js";
export class RolePermissionService {
    static async findAll() {
        return RolePermission.findAll({
            order: [["roleId", "ASC"], ["permissionId", "ASC"]],
        });
    }
    static async findById(roleId: number, permissionId: number) {
        return RolePermission.findOne({ where: { roleId, permissionId } });
    }
    static async create(data: {
        roleId: number;
        permissionId: number;
    }) {
        return RolePermission.create(data);
    }
    static async delete(rolePermission: RolePermission) {
        await rolePermission.destroy();
    }
}