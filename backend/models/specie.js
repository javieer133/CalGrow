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
    },
    seasonStart: {
      type: DataTypes.DATE,
      unique: false,
    },
    seasonFinish: {
      type: DataTypes.DATE,
      unique: false,
    },
    medida: {
      type: DataTypes.DECIMAL,
      unique: false,
    },
    harvestDays: {
      type: DataTypes.DATE,
      unique: false,
    }
  },
    {
      freezeTableName: true
    }
  );

  Specie.associate = (models) => {
    Specie.hasMany(models.variety);
    Specie.belongsTo(models.tmeasure);
  };

  

  return Specie;
}
