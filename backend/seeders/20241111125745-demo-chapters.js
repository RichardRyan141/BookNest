'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Chapters', [
      {
        chapter_id: 1,
        chapter_title: 'Test 1',
        book_id: 1,
        content: '"Now I have to interrupt you with some urgent news. According to our station, Mr. Jiang Gu Lao, a famous adventurer and martial arts master from Dongxia, has been confirmed to have died in [One Piece World] at the age of 53..."',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Chapters', null, {});
  }
};
