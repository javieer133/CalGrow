//NOTE: "species" word is intentionally misspelled to avoid conflicts with singular/plural definitions.
module.exports = (sequelize, DataTypes) => {
  const Specie = sequelize.define('specie', {
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

  Specie.associate = (models) => {
    Specie.hasMany(models.variety);
  };

  return Specie;
}
