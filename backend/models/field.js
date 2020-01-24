module.exports = (sequelize, DataTypes) => {
  const Field = sequelize.define('field', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    gps_pos: DataTypes.STRING,
    subscriptionId: {
      type: DataTypes.INTEGER,
    },
    
  },
    {
      freezeTableName: true
    }
  );

  Field.associate = (models) => {
    Field.hasMany(models.sector);
  };

  return Field;
}
