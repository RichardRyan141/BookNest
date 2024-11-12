'use strict';

const bcrypt = require('bcrypt'); // Optional: for hashing passwords

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const passwordHash1 = await bcrypt.hash('password123', 10);
    const passwordHash2 = await bcrypt.hash('password456', 10);

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: passwordHash1,
        role: 'admin',
        credits: 999999999,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Regular User',
        email: 'user@example.com',
        password: passwordHash2,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
