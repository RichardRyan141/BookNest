module.exports = (sequelize, DataTypes) => {
  const ChapterPurchaseHistory = sequelize.define('ChapterPurchaseHistory', {
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

  ChapterPurchaseHistory.associate = function (models) {
    ChapterPurchaseHistory.belongsTo(models.User, {
          foreignKey: 'user_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
      });

      ChapterPurchaseHistory.belongsTo(models.Book, {
          foreignKey: 'book_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
      });

      ChapterPurchaseHistory.belongsTo(models.Chapter, {
          foreignKey: 'chapter_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
      });
  };

  return ChapterPurchaseHistory;
};
