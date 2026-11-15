'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const roles = await queryInterface.sequelize.query(
      'SELECT id, name FROM roles WHERE name IN (:names)',
      {
        replacements: { names: ['ADMIN', 'COORDINATOR', 'TEACHER', 'STUDENT'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    const permissions = await queryInterface.sequelize.query(
      'SELECT id, code FROM permissions',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const roleId = Object.fromEntries(roles.map((r) => [r.name, r.id]));
    const permissionId = Object.fromEntries(permissions.map((p) => [p.code, p.id]));

    const permissionsByRole = {
      ADMIN: [
        'user:read', 'user:write',
        'student:read', 'student:write',
        'company:read', 'company:write',
        'survey:manage', 'survey:answer',
        'audit:read',
      ],
      COORDINATOR: [
        'user:read',
        'student:read', 'student:write',
        'company:read', 'company:write',
        'survey:manage',
      ],
      TEACHER: ['student:read', 'company:read'],
      STUDENT: ['survey:answer'],
    };

    const rows = [];
    for (const [roleName, codes] of Object.entries(permissionsByRole)) {
      for (const code of codes) {
        rows.push({ role_id: roleId[roleName], permission_id: permissionId[code] });
      }
    }

    await queryInterface.bulkInsert('role_permissions', rows, {});
  },

  async down (queryInterface, Sequelize) {
    const roles = await queryInterface.sequelize.query(
      'SELECT id FROM roles WHERE name IN (:names)',
      {
        replacements: { names: ['ADMIN', 'COORDINATOR', 'TEACHER', 'STUDENT'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    await queryInterface.bulkDelete('role_permissions', {
      role_id: roles.map((r) => r.id),
    }, {});
  }
};