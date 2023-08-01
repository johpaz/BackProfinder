const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Location",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: false,
      }, longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: false,
      },
    
    },
    {
      timestamps: false,
    }
  );
};
