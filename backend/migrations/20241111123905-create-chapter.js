'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chapters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chapter_id: {
        type: Sequelize.INTEGER
      },
      chapter_title: {
        type: Sequelize.STRING,
      },
      book_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Books',
            schema: 'public'  // Specify the schema explicitly
          },   
          key: 'id' // The column in 'Books' that 'book_id' references
        },
        onDelete: 'CASCADE', // Optional: Delete chapters when a book is deleted
        onUpdate: 'CASCADE'  // Optional: Update chapters if the book id changes
      },
      content: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Chapters');
  }
};