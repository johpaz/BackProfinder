const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("ProfesionalImagesPost",{
    id:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    image:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        isUrl: {
          msg: 'La URL de la imagen no es válida',
          args: true,
        },
      },
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: true,
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
    view: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },{
    timestamps: false,
  })
};