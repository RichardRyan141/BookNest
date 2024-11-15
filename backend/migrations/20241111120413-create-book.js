'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      cover_img: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'ongoing'
      },
      author_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
            schema: 'public'  // Specify the schema explicitly
          },      
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      publisher: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Books');
  }
};