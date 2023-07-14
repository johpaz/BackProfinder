const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("User",{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull:false
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    password:{
      type: DataTypes.STRING,
      allowNull:false
    },
    usuario :{//es el tipo de usuario c,p ,a 
      type: DataTypes.STRING
    },
    
    googleId:{
      type: DataTypes.STRING
    },
    
    secreto:{
      type: DataTypes.STRING
    },


  },{
    timestamps: false,
  })
};// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8