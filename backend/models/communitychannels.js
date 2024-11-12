module.exports = (sequelize, DataTypes) => {
  const CommunityChannel = sequelize.define('CommunityChannel', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    community_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    visibility: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'members only',
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
  CommunityChannel.associate = function (models) {
    CommunityChannel.belongsTo(models.Community, {
      foreignKey: 'community_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return CommunityChannel;
};
