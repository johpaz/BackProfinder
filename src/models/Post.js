const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("Post", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        is: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, // El título debe ser una palabra o frase sin números ni símbolos, pero puede incluir la letra "ñ" o "Ñ"
        len:[5,200] // El title debe tener mínimo 3 caracteres y máximo 200
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
    },
  }, {
    timestamps: false,
  });
};