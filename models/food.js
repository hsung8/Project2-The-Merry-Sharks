module.exports = function(sequelize, DataTypes) {
  const Food = sequelize.define("Food", {
    // The type of food that was eaten
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
    },
    protein: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fat: {
      type: DataTypes.STRING,
      allowNull: true
    },
    carb: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fiber: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  Food.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Food.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Food;
};
