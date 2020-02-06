module.exports = (sequelize, DataTypes) => {
    const Tmeasure = sequelize.define('tmeasure', {
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
  
    Tmeasure.associate = (models) => {
        Tmeasure.hasMany(models.specie);
    };
  
    
  
    return Tmeasure;
  }
  