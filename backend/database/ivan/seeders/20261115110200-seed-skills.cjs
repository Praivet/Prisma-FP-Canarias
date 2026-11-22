'use strict';

// Skill (un lado de la N:M Student <-> Skill). No depende de nada.

const NAMES = ["JavaScript", "TypeScript", "React", "SQL", "Git", "Docker", "Redes TCP/IP", "Trabajo en equipo"];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("skills", [
      { name: "JavaScript", category: "Programming", description: "Web programming language for frontend and backend" },
      { name: "TypeScript", category: "Programming", description: "Typed superset of JavaScript" },
      { name: "React", category: "Frontend", description: "Library for building user interfaces" },
      { name: "SQL", category: "Databases", description: "Querying and designing relational databases" },
      { name: "Git", category: "Tools", description: "Version control and team workflows" },
      { name: "Docker", category: "Systems", description: "Containers for deploying applications" },
      { name: "Redes TCP/IP", category: "Systems", description: "Network configuration and troubleshooting" },
      { name: "Trabajo en equipo", category: "Soft skills", description: "Collaboration towards a shared goal" },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("skills", { name: NAMES });
  },
};
