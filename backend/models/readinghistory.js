module.exports = (sequelize, DataTypes) => {
  const ReadingHistory = sequelize.define('ReadingHistory', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      book_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      chapter_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
  });

  ReadingHistory.associate = function (models) {
      ReadingHistory.belongsTo(models.User, {
          foreignKey: 'user_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
      });

      ReadingHistory.belongsTo(models.Book, {
          foreignKey: 'book_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
      });

      ReadingHistory.belongsTo(models.Chapter, {
          foreignKey: 'chapter_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
      });
  };

  return ReadingHistory;
};
