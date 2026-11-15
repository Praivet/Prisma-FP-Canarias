'use strict';

// AcademicYear (lado "uno" de 1:N con StudentEnrollment y TutorAssignment). No depende de nada.

const NAMES = ["2024-2025", "2025-2026", "2026-2027"];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("academic_years", [
      { name: "2024-2025", start_date: "2024-09-09", end_date: "2025-06-20", is_active: false },
      { name: "2025-2026", start_date: "2025-09-08", end_date: "2026-06-19", is_active: false },
      // Solo el curso actual está activo.
      { name: "2026-2027", start_date: "2026-09-14", end_date: "2027-06-18", is_active: true },
    ]);
  },

  async down(queryInterface) {
    // { name: [...] } = WHERE name IN (...)
    await queryInterface.bulkDelete("academic_years", { name: NAMES });
  },
};
