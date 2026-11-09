'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permissions', [
      { code: 'user:read', description: 'View users' },
      { code: 'user:write', description: 'Create, edit and delete users' },
      { code: 'student:read', description: 'View students' },
      { code: 'student:write', description: 'Create, edit and delete students' },
      { code: 'company:read', description: 'View companies' },
      { code: 'company:write', description: 'Create, edit and delete companies' },
      { code: 'survey:manage', description: 'Create surveys and send invitations' },
      { code: 'survey:answer', description: 'Answer surveys' },
      { code: 'audit:read', description: 'View the audit log' },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions', {
      code: [
        'user:read', 'user:write',
        'student:read', 'student:write',
        'company:read', 'company:write',
        'survey:manage', 'survey:answer',
        'audit:read',
      ],
    }, {});
  }
};