module.exports = (sequelize, DataTypes) => {
  const Plant = sequelize.define('plant', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    gps_pos: DataTypes.STRING,
    subscriptionId: DataTypes.INTEGER,
  },
    {
      freezeTableName: true
    }
  );

  Plant.associate = (models) => {
    Plant.hasMany(models.fruit);
    Plant.hasMany(models.mean);
    Plant.belongsTo(models.sector);
    Plant.belongsTo(models.variety);
  };

  return Plant;
}
