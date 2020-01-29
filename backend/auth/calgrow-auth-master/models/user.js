module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    fullName: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    }
  });

  User.associate = (models) => {
    User.belongsTo(models.subscription);
  };

  return User;
}