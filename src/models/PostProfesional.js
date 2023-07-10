const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("PostProfesional",{
    id:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:[5,200] // El nombre del title debe tener mínimo 3 caracteres y máximo 200
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          msg: 'La URL de la imagen no es válida',
          args: true,
        },
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El contenido no puede estar vacío',
        },
        checkContent(value) {
          if (typeof value !== 'string') {
            throw new Error('El contenido debe ser una cadena de texto');
          }
          if (value.length > 1000) {
            throw new Error('El contenido no puede exceder los 1000 caracteres');
          }
          if (/^\d+$/.test(value)) {
            throw new Error('El contenido no puede consistir solo de números');
          }
          if (/^[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(value)) {
            throw new Error('El contenido no puede consistir solo de símbolos');
          }
        },
      },
    },
  },{
    timestamps: false,
  })
};