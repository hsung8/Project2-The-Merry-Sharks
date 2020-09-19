module.exports = function(sequelize, DataTypes) {
  const Food = sequelize.define("Food", {
    // The type of food that was eaten
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    foodName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // The number of calories
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // The meal it will be logged as (Breakfast, Lunch, Dinner, Snack)
    meal: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return Food;
};
