module.exports = (sequelize, DataTypes) => {

  const Subscription = sequelize.define('subscription', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    plan: {
      type: DataTypes.STRING,
    }
  });

  Subscription.associate = (models) => {
    Subscription.hasMany(models.user);
  };

  return Subscription;
}