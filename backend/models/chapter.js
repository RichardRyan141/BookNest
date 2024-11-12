module.exports = (sequelize, DataTypes) => {
  const Chapter = sequelize.define('Chapter', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // This will be the unique primary key
    },
    chapter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    chapter_title: {
      type: DataTypes.STRING,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Foreign key to the Book
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false, // Content of the chapter
    },
  });

  Chapter.associate = function (models) {
    // Establishing the relationship between Chapter and Book
    Chapter.belongsTo(models.Book, {
      foreignKey: 'book_id',
      onDelete: 'CASCADE',  // Deletes chapters if the associated book is deleted
      onUpdate: 'CASCADE',  // Updates the chapters if the book's ID changes
    });

    Chapter.hasMany(models.ReadingHistory, {
      foreignKey: 'chapter_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Chapter;
};
