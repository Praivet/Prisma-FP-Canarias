'use strict';

const NATIONAL_IDS = ['45123456D', '78654321W'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    // Depends on the student and consent-request seeders.
    const students = await queryInterface.sequelize.query(
      'SELECT id, national_id FROM students WHERE national_id IN (:ids)',
      {
        replacements: { ids: NATIONAL_IDS },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    // Each student has one seeded request, so the student's national_id is enough as key.
    const requests = await queryInterface.sequelize.query(
      `SELECT cr.id, s.national_id FROM consent_requests cr
       JOIN students s ON s.id = cr.student_id
       WHERE s.national_id IN (:ids)`,
      {
        replacements: { ids: NATIONAL_IDS },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const studentId = Object.fromEntries(students.map((s) => [s.national_id, s.id]));
    const requestId = Object.fromEntries(requests.map((r) => [r.national_id, r.id]));

    // Status values allowed by the model: granted, denied, revoked.
    await queryInterface.bulkInsert('consents', [
      { student_id: studentId['45123456D'], consent_request_id: requestId['45123456D'], purpose: 'employment_tracking', status: 'granted', policy_version: 'v1.0', recorded_at: new Date('2026-09-22'), created_at: now, updated_at: now },
      { student_id: studentId['45123456D'], consent_request_id: requestId['45123456D'], purpose: 'surveys', status: 'granted', policy_version: 'v1.0', recorded_at: new Date('2026-09-22'), created_at: now, updated_at: now },
      { student_id: studentId['78654321W'], consent_request_id: requestId['78654321W'], purpose: 'employment_tracking', status: 'granted', policy_version: 'v1.0', recorded_at: new Date('2025-06-27'), created_at: now, updated_at: now },
      { student_id: studentId['78654321W'], consent_request_id: requestId['78654321W'], purpose: 'surveys', status: 'denied', policy_version: 'v1.0', recorded_at: new Date('2025-06-27'), created_at: now, updated_at: now },
      // Pablo revoked later without a new request, so consent_request_id is null.
      { student_id: studentId['78654321W'], consent_request_id: null, purpose: 'employment_tracking', status: 'revoked', policy_version: 'v1.0', recorded_at: new Date('2026-02-10'), created_at: now, updated_at: now },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const students = await queryInterface.sequelize.query(
      'SELECT id FROM students WHERE national_id IN (:ids)',
      {
        replacements: { ids: NATIONAL_IDS },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    await queryInterface.bulkDelete('consents', {
      student_id: students.map((s) => s.id),
    }, {});
  }
};
