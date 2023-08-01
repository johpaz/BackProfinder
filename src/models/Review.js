const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("Review", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        max: 5,
        min: 1
      }
    }
  }, {
    timestamps: false,
  });
};