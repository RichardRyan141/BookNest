module.exports = (sequelize, DataTypes) => {
  const Community = sequelize.define('Community', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    logo_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    creator_id: {
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
  Community.associate = function (models) {
    Community.belongsTo(models.User, {
      foreignKey: 'creator_id',
      as: 'creator',
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL',
    });

    Community.hasMany(models.CommunityMember, {
      foreignKey: 'community_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Community;
};
