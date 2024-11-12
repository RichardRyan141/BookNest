module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Auto-increment primary key
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false, // Title is required
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false, // Description is required
    },
    cover_img: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field for the cover image
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'ongoing', // Default status is 'ongoing'
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // author_id is required
      references: {
        model: 'User', // References the 'User' table
        key: 'id',     // The column in 'User' that 'author_id' references
      },
      onDelete: 'CASCADE',  // Deletes the book if the associated user is deleted
      onUpdate: 'CASCADE',  // Updates the book's author_id if the user id changes
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: true, // Publisher is optional
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,  // Default value for creation timestamp
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,  // Default value for update timestamp
    },
  });

  // Associations
  Book.associate = function (models) {
    // A book belongs to a user (author)
    Book.belongsTo(models.User, {
      foreignKey: 'author_id',
      as: 'author', // Alias the relationship as 'author'
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
  });
    // A book has many chapters
    Book.hasMany(models.Chapter, {
      foreignKey: 'book_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Book.hasMany(models.ReadingHistory, {
      foreignKey: 'book_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Book;
};
