module.exports = (sequelize, DataTypes) => {
  const CommunityMember = sequelize.define('CommunityMember', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    community_id: {
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

  // Associations
  CommunityMember.associate = function (models) {
    CommunityMember.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    CommunityMember.belongsTo(models.Community, {
      foreignKey: 'community_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return CommunityMember;
};
