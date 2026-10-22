import { User } from '../../src/modules/user/user.model';
import { Role } from '../../src/modules/role/role.model';
import { Permission } from '../../src/modules/permission/permission.model';
import { UserRole } from '../../src/modules/user-role/user-role.model';
import { RolePermission } from '../../src/modules/role-permission/role-permission.model';
import { AuthToken } from '../../src/modules/auth-token/auth-token.model';
import { AuditLog } from '../../src/modules/audit-log/audit-log.model';

// User - Role (N:M)
User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId', otherKey: 'roleId', as: 'roles' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId', otherKey: 'userId', as: 'users' });

// Role - Permission (N:M)
Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: 'roleId',
  otherKey: 'permissionId',
  as: 'permissions',
});
Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: 'permissionId',
  otherKey: 'roleId',
  as: 'roles',
});

// User - AuthToken (1:N)
User.hasMany(AuthToken, { foreignKey: 'userId', as: 'authTokens' });
AuthToken.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// User - AuditLog (1:N)
User.hasMany(AuditLog, { foreignKey: 'userId', as: 'auditLogs' });
AuditLog.belongsTo(User, { foreignKey: 'userId', as: 'user' });