'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permissions', [{
      id: 1,                    /* Épica 2 (Kacper) */
      code: 'user:read',
      description: 'View users'
    },{
      id: 2,
      code: 'user:create',
      description: 'Create users'
    },{
      id: 3,
      code: 'user:update',
      description: 'Edit users'
    },{
      id: 4,
      code: 'user:delete',
      description: 'Delete users'
    },{
      id: 5,
      code: 'role:read',
      description: 'View roles'
    },{
      id: 6,
      code: 'role:create',
      description: 'Create roles'
    },{
      id: 7,
      code: 'role:update',
      description: 'Edit roles'
    },{
      id: 8,
      code: 'role:delete',
      description: 'Delete roles'
    },{
      id: 9,
      code: 'permission:read',
      description: 'View permissions'
    },{
      id: 10,
      code: 'permission:create',
      description: 'Create permissions'
    },{
      id: 11,
      code: 'permission:update',
      description: 'Edit permissions'
    },{
      id: 12,
      code: 'permission:delete',
      description: 'Delete permissions'
    },{
      id: 13,
      code: 'user-role:read',
      description: 'View user role assignments'
    },{
      id: 14,
      code: 'user-role:create',
      description: 'Create user role assignments'
    },{
      id: 15,
      code: 'user-role:update',
      description: 'Edit user role assignments'
    },{
      id: 16,
      code: 'user-role:delete',
      description: 'Delete user role assignments'
    },{
      id: 17,
      code: 'role-permission:read',
      description: 'View role permission assignments'
    },{
      id: 18,
      code: 'role-permission:create',
      description: 'Create role permission assignments'
    },{
      id: 19,
      code: 'role-permission:update',
      description: 'Edit role permission assignments'
    },{
      id: 20,
      code: 'role-permission:delete',
      description: 'Delete role permission assignments'
    },{
      id: 21,
      code: 'auth-token:read',
      description: 'View auth tokens'
    },{
      id: 22,
      code: 'auth-token:create',
      description: 'Create auth tokens'
    },{
      id: 23,
      code: 'auth-token:update',
      description: 'Edit auth tokens'
    },{
      id: 24,
      code: 'auth-token:delete',
      description: 'Delete auth tokens'
    },{
      id: 25,                   /* Épica 3 (Iván) */
      code: 'student:read',
      description: 'View students'
    },{
      id: 26,
      code: 'student:create',
      description: 'Create students'
    },{
      id: 27,
      code: 'student:update',
      description: 'Edit students'
    },{
      id: 28,
      code: 'student:delete',
      description: 'Delete students'
    },{
      id: 29,
      code: 'student-enrollment:read',
      description: 'View student enrollments'
    },{
      id: 30,
      code: 'student-enrollment:create',
      description: 'Create student enrollments'
    },{
      id: 31,
      code: 'student-enrollment:update',
      description: 'Edit student enrollments'
    },{
      id: 32,
      code: 'student-enrollment:delete',
      description: 'Delete student enrollments'
    },{
      id: 33,
      code: 'student-skill:read',
      description: 'View student skills'
    },{
      id: 34,
      code: 'student-skill:create',
      description: 'Create student skills'
    },{
      id: 35,
      code: 'student-skill:update',
      description: 'Edit student skills'
    },{
      id: 36,
      code: 'student-skill:delete',
      description: 'Delete student skills'
    },{
      id: 37,
      code: 'student-interest:read',
      description: 'View student interests'
    },{
      id: 38,
      code: 'student-interest:create',
      description: 'Create student interests'
    },{
      id: 39,
      code: 'student-interest:update',
      description: 'Edit student interests'
    },{
      id: 40,
      code: 'student-interest:delete',
      description: 'Delete student interests'
    },{
      id: 41,
      code: 'skill:read',
      description: 'View skills'
    },{
      id: 42,
      code: 'skill:create',
      description: 'Create skills'
    },{
      id: 43,
      code: 'skill:update',
      description: 'Edit skills'
    },{
      id: 44,
      code: 'skill:delete',
      description: 'Delete skills'
    },{
      id: 45,
      code: 'training-program:read',
      description: 'View training programs'
    },{
      id: 46,
      code: 'training-program:create',
      description: 'Create training programs'
    },{
      id: 47,
      code: 'training-program:update',
      description: 'Edit training programs'
    },{
      id: 48,
      code: 'training-program:delete',
      description: 'Delete training programs'
    },{
      id: 49,
      code: 'academic-year:read',
      description: 'View academic years'
    },{
      id: 50,
      code: 'academic-year:create',
      description: 'Create academic years'
    },{
      id: 51,
      code: 'academic-year:update',
      description: 'Edit academic years'
    },{
      id: 52,
      code: 'academic-year:delete',
      description: 'Delete academic years'
    },{
      id: 53,
      code: 'tutor-assignment:read',
      description: 'View tutor assignments'
    },{
      id: 54,
      code: 'tutor-assignment:create',
      description: 'Create tutor assignments'
    },{
      id: 55,
      code: 'tutor-assignment:update',
      description: 'Edit tutor assignments'
    },{
      id: 56,
      code: 'tutor-assignment:delete',
      description: 'Delete tutor assignments'
    },{
      id: 57,                   /* Épica 3 (Juan Pablo) */
      code: 'employment-record:read',
      description: 'View employment records'
    },{
      id: 58,
      code: 'employment-record:create',
      description: 'Create employment records'
    },{
      id: 59,
      code: 'employment-record:update',
      description: 'Edit employment records'
    },{
      id: 60,
      code: 'employment-record:delete',
      description: 'Delete employment records'
    },{
      id: 61,                   /* Épica 4 (Juan Pablo) */
      code: 'consent:read',
      description: 'View consents'
    },{
      id: 62,
      code: 'consent:create',
      description: 'Create consents'
    },{
      id: 63,
      code: 'consent:update',
      description: 'Edit consents'
    },{
      id: 64,
      code: 'consent:delete',
      description: 'Delete consents'
    },{
      id: 65,
      code: 'consent-request:read',
      description: 'View consent requests'
    },{
      id: 66,
      code: 'consent-request:create',
      description: 'Create consent requests'
    },{
      id: 67,
      code: 'consent-request:update',
      description: 'Edit consent requests'
    },{
      id: 68,
      code: 'consent-request:delete',
      description: 'Delete consent requests'
    },{
      id: 69,                   /* Épica 6 (Juan Pablo) */
      code: 'company:read',
      description: 'View companies'
    },{
      id: 70,
      code: 'company:create',
      description: 'Create companies'
    },{
      id: 71,
      code: 'company:update',
      description: 'Edit companies'
    },{
      id: 72,
      code: 'company:delete',
      description: 'Delete companies'
    },{
      id: 73,
      code: 'internship:read',
      description: 'View internships'
    },{
      id: 74,
      code: 'internship:create',
      description: 'Create internships'
    },{
      id: 75,
      code: 'internship:update',
      description: 'Edit internships'
    },{
      id: 76,
      code: 'internship:delete',
      description: 'Delete internships'
    },{
      id: 77,                   /* Épica 7 (Juan Pablo) */
      code: 'survey:read',
      description: 'View surveys'
    },{
      id: 78,
      code: 'survey:create',
      description: 'Create surveys'
    },{
      id: 79,
      code: 'survey:update',
      description: 'Edit surveys'
    },{
      id: 80,
      code: 'survey:delete',
      description: 'Delete surveys'
    },{
      id: 81,
      code: 'survey-question:read',
      description: 'View survey questions'
    },{
      id: 82,
      code: 'survey-question:create',
      description: 'Create survey questions'
    },{
      id: 83,
      code: 'survey-question:update',
      description: 'Edit survey questions'
    },{
      id: 84,
      code: 'survey-question:delete',
      description: 'Delete survey questions'
    },{
      id: 85,
      code: 'survey-invitation:read',
      description: 'View survey invitations'
    },{
      id: 86,
      code: 'survey-invitation:create',
      description: 'Create survey invitations'
    },{
      id: 87,
      code: 'survey-invitation:update',
      description: 'Edit survey invitations'
    },{
      id: 88,
      code: 'survey-invitation:delete',
      description: 'Delete survey invitations'
    },{
      id: 89,
      code: 'survey-answer:read',
      description: 'View survey answers'
    },{
      id: 90,
      code: 'survey-answer:create',
      description: 'Create survey answers'
    },{
      id: 91,
      code: 'survey-answer:update',
      description: 'Edit survey answers'
    },{
      id: 92,
      code: 'survey-answer:delete',
      description: 'Delete survey answers'
    },{
      id: 93,                   /* Épica 8 (Iván) */
      code: 'dashboard:read',
      description: 'View the KPI dashboard'
    },{
      id: 94,
      code: 'report:export',
      description: 'Export reports to PDF and Excel'
    },{
      id: 95,                   /* Épica 9 (Kacper) */
      code: 'audit-log:read',
      description: 'View audit log entries'
    },{
      id: 96,
      code: 'audit-log:create',
      description: 'Create audit log entries'
    },{
      id: 97,
      code: 'audit-log:update',
      description: 'Edit audit log entries'
    },{
      id: 98,
      code: 'audit-log:delete',
      description: 'Delete audit log entries'
    },{
      id: 99,
      code: 'educational-center:read',
      description: 'View educational centers'
    },{
      id: 100,
      code: 'educational-center:create',
      description: 'Create educational centers'
    },{
      id: 101,
      code: 'educational-center:update',
      description: 'Edit educational centers'
    },{
      id: 102,
      code: 'educational-center:delete',
      description: 'Delete educational centers'
    },{
      id: 103,
      code: 'professional-family:read',
      description: 'View professional families'
    },{
      id: 104,
      code: 'professional-family:create',
      description: 'Create professional families'
    },{
      id: 105,
      code: 'professional-family:update',
      description: 'Edit professional families'
    },{
      id: 106,
      code: 'professional-family:delete',
      description: 'Delete professional families'
    }], {});

    // Synchronize PostgreSQL autoincrement
    if (queryInterface.sequelize.getDialect() === "postgres") {
      await queryInterface.sequelize.query(`
            SELECT setval(
              pg_get_serial_sequence('public.permissions', 'id'),
              COALESCE((SELECT MAX(id) FROM public.permissions), 0) + 1,
              false
            );
          `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions', { id: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
      61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
      81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
      101, 102, 103, 104, 105, 106]
    });
  }
};
