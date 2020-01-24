module.exports = (sequelize, DataTypes) => {
  const Mean = sequelize.define('mean', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ecuatorial_mean: DataTypes.DECIMAL,
    polar_mean: DataTypes.DECIMAL
  },
    {
      freezeTableName: true
    }
  );

  Mean.associate = (models) => {
    Mean.belongsTo(models.plant);
  };

  return Mean;
}
