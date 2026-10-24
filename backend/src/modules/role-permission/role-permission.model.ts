import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../../config/database';
import { Role } from '../role/role.model';
import { Permission } from '../permission/permission.model'

export class RolePermission extends Model<
  InferAttributes<RolePermission>,
  InferCreationAttributes<RolePermission>
> {
  declare roleId: ForeignKey<Role['id']>;
  declare permissionId: ForeignKey<Permission['id']>;
}

RolePermission.init(
  {
    roleId: { type: DataTypes.INTEGER, primaryKey: true },
    permissionId: { type: DataTypes.INTEGER, primaryKey: true },
  },
  {
    sequelize,
    tableName: 'role_permissions',
    timestamps: false,
  },
);