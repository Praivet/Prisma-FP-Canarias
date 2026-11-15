'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('skills', [
      { name: 'JavaScript', category: 'Programming', description: 'Web programming language for frontend and backend' },
      { name: 'TypeScript', category: 'Programming', description: 'Typed superset of JavaScript' },
      { name: 'Java', category: 'Programming', description: 'Object-oriented language for desktop and server apps' },
      { name: 'React', category: 'Frontend', description: 'Library for building user interfaces' },
      { name: 'Node.js', category: 'Backend', description: 'JavaScript runtime for server applications' },
      { name: 'SQL', category: 'Databases', description: 'Querying and designing relational databases' },
      { name: 'Git', category: 'Tools', description: 'Version control and team workflows' },
      { name: 'Docker', category: 'Systems', description: 'Containers for deploying applications' },
      { name: 'Redes TCP/IP', category: 'Systems', description: 'Network configuration and troubleshooting' },
      { name: 'Inglés', category: 'Languages', description: 'English for technical and professional use' },
      { name: 'Trabajo en equipo', category: 'Soft skills', description: 'Collaboration with other people towards a shared goal' },
      { name: 'Comunicación', category: 'Soft skills', description: 'Clear oral and written communication' },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('skills', {
      name: [
        'JavaScript', 'TypeScript', 'Java', 'React', 'Node.js', 'SQL',
        'Git', 'Docker', 'Redes TCP/IP', 'Inglés', 'Trabajo en equipo', 'Comunicación',
      ],
    }, {});
  }
};
