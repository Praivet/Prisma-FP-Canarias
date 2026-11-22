'use strict';

// NO son entidades mías: usuarios, familias profesionales y centros que necesitan mis seeders
// para rellenar sus FKs (students.user_id, tutor_assignments.tutor_id, training_programs.family_id/center_id).

const USER_EMAILS = ["ana@prismafp.test", "pablo@prismafp.test", "javier@prismafp.test", "carmen@prismafp.test"];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    // bulkInsert escribe directamente en la tabla: nombres de columna en snake_case, como en la migración.
    // createdAt/updatedAt NO se rellenan solos (no pasa por el modelo), hay que ponerlos a mano.
    await queryInterface.bulkInsert("users", [
      { email: "ana@prismafp.test", password_hash: "hash-ana", first_name: "Ana", last_name: "Pérez Medina", created_at: now, updated_at: now },
      { email: "pablo@prismafp.test", password_hash: "hash-pablo", first_name: "Pablo", last_name: "Suárez Quintana", created_at: now, updated_at: now },
      { email: "javier@prismafp.test", password_hash: "hash-javier", first_name: "Javier", last_name: "Hernández Díaz", created_at: now, updated_at: now },
      { email: "carmen@prismafp.test", password_hash: "hash-carmen", first_name: "Carmen", last_name: "Rodríguez Santana", created_at: now, updated_at: now },
    ]);

    await queryInterface.bulkInsert("professional_families", [
      { name: "Informática y Comunicaciones", code: "IFC" },
      { name: "Administración y Gestión", code: "ADG" },
    ]);

    await queryInterface.bulkInsert("educational_centers", [
      { name: "IES Las Palmas Centro", code: "CEN-0001", address: "Calle Triana 12, Las Palmas de Gran Canaria" },
      { name: "IES Tenerife Norte", code: "CEN-0002", address: "Avenida de Anaga 45, Santa Cruz de Tenerife" },
    ]);
  },

  // down borra solo lo que insertó up (por sus valores únicos), en orden inverso.
  async down(queryInterface) {
    await queryInterface.bulkDelete("educational_centers", { code: ["CEN-0001", "CEN-0002"] });
    await queryInterface.bulkDelete("professional_families", { code: ["IFC", "ADG"] });
    await queryInterface.bulkDelete("users", { email: USER_EMAILS });
  },
};
