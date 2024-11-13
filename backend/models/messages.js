module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
    },
    channel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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

  // Associations
  Message.associate = function (models) {
    Message.belongsTo(models.User, {
      foreignKey: 'author_id',
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL',
    });
    Message.belongsTo(models.CommunityChannel, {
      foreignKey: 'channel_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Message;
};
