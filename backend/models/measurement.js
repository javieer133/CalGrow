module.exports = (sequelize, DataTypes) => {
  const Measurement = sequelize.define('measurement', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ecuatorial_length: DataTypes.DECIMAL,
    polar_length: DataTypes.DECIMAL
  },
    {
      freezeTableName: true
    }
  );

  Measurement.associate = (models) => {
    Measurement.belongsTo(models.fruit);
  };

  return Measurement;
}
