module.exports = (sequelize, DataTypes) => {
  const Fruit = sequelize.define('fruit', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    fruitPlantId: {
      type: DataTypes.INTEGER,
    },
  },
    {
      freezeTableName: true
    }
  );

  Fruit.associate = (models) => {
    Fruit.belongsTo(models.plant);
    Fruit.hasMany(models.measurement);
  };

  return Fruit;
}
