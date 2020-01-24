module.exports = (sequelize, DataTypes) => {
  const Sector = sequelize.define('sector', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
    {
      freezeTableName: true
    }
  );

  Sector.associate = (models) => {
    Sector.hasMany(models.plant);
    Sector.belongsTo(models.field);
  };

  return Sector;
}
