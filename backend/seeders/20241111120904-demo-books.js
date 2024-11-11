'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserting demo books into the 'Books' table
    await queryInterface.bulkInsert('Books', [
      {
        title: 'The Great Gatsby',
        description: 'A novel by F. Scott Fitzgerald that explores themes of wealth, class, and the American Dream.',
        cover_img: '',
        author: 'F. Scott Fitzgerald',
        publisher: 'Charles Scribner\'s Sons',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '1984',
        description: 'A dystopian novel by George Orwell, set in a totalitarian society ruled by the Party and its leader, Big Brother.',
        author: 'George Orwell',
        cover_img: '',
        publisher: 'Secker & Warburg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'To Kill a Mockingbird',
        description: 'A novel by Harper Lee, addressing serious issues like racial injustice and moral growth in the American South.',
        author: 'Harper Lee',
        cover_img: '',
        publisher: 'J.B. Lippincott & Co.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Moby Dick',
        description: 'Herman Melville\'s novel about the obsession of Captain Ahab with hunting the great white whale, Moby Dick.',
        author: 'Herman Melville',
        cover_img: '',
        publisher: 'Harper & Brothers',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    // Revert the changes made by the seeder
    await queryInterface.bulkDelete('Books', null, {});
  }
};
