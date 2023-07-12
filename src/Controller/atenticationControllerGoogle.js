const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('nombre_base_de_datos', 'usuario', 'contraseña', {
  host: 'localhost',
  dialect: 'postgres',  
});   

const User = sequelize.define('User', {
  googleId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  // Otros campos que desees almacenar en el modelo de usuario
});
// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8



    
module.exports = User;
