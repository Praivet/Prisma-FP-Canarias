'use strict';

// StudentEnrollment: lado "muchos" de tres 1:N (Student, TrainingProgram y AcademicYear).
// Necesita las tres FKs, así que va después de los seeders de esas tres tablas.

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const students = await queryInterface.sequelize.query(
      "SELECT id, national_id FROM students WHERE national_id IN (:ids)",
      { replacements: { ids: ["45123456D", "78654321W"] }, type: Sequelize.QueryTypes.SELECT }
    );
    const programs = await queryInterface.sequelize.query(
      "SELECT id, code FROM training_programs WHERE code IN (:codes)",
      { replacements: { codes: ["IFC-DAW", "IFC-SMR"] }, type: Sequelize.QueryTypes.SELECT }
    );
    const years = await queryInterface.sequelize.query(
      "SELECT id, name FROM academic_years WHERE name IN (:names)",
      { replacements: { names: ["2024-2025", "2025-2026", "2026-2027"] }, type: Sequelize.QueryTypes.SELECT }
    );
    const studentId = Object.fromEntries(students.map((s) => [s.national_id, s.id]));
    const programId = Object.fromEntries(programs.map((p) => [p.code, p.id]));
    const yearId = Object.fromEntries(years.map((y) => [y.name, y.id]));

    await queryInterface.bulkInsert("student_enrollments", [
      // Ana: DAW en 2025-2026 y 2026-2027, estudiando.
      { student_id: studentId["45123456D"], program_id: programId["IFC-DAW"], academic_year_id: yearId["2025-2026"], enrollment_date: "2025-09-08", status: "enrolled" },
      { student_id: studentId["45123456D"], program_id: programId["IFC-DAW"], academic_year_id: yearId["2026-2027"], enrollment_date: "2026-09-14", status: "enrolled" },
      // Pablo: terminó SMR y luego dejó DAW.
      { student_id: studentId["78654321W"], program_id: programId["IFC-SMR"], academic_year_id: yearId["2024-2025"], enrollment_date: "2024-09-09", graduation_date: "2025-06-20", status: "graduated" },
      { student_id: studentId["78654321W"], program_id: programId["IFC-DAW"], academic_year_id: yearId["2025-2026"], enrollment_date: "2025-09-08", status: "dropped" },
    ]);
  },

  // Borra las matrículas de estos alumnos (WHERE student_id IN (...)).
  async down(queryInterface, Sequelize) {
    const students = await queryInterface.sequelize.query(
      "SELECT id FROM students WHERE national_id IN (:ids)",
      { replacements: { ids: ["45123456D", "78654321W"] }, type: Sequelize.QueryTypes.SELECT }
    );
    await queryInterface.bulkDelete("student_enrollments", { student_id: students.map((s) => s.id) });
  },
};
