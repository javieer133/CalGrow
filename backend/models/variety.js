module.exports = (sequelize, DataTypes) => {
  const Variety = sequelize.define('variety', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    }
  },
    {
      freezeTableName: true
    }
  );

  Variety.associate = (models) => {
    Variety.belongsTo(models.specie);
    Variety.hasMany(models.plant);
  };

  return Variety;
}
