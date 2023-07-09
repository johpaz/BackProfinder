const bcrypt= require("bcrypt");

const {sequelize} = require("../db");


const loginUser=async (req,res)=>{
    const {email,password}= req.body;
    const sql= await sequelize.query(`SELECT * FROM "Users" where email= '${email}'`);
  
    try {
        if (!sql[0].length){res.status(400).json({message:"The email has not been found"})};

        if (sql[0][0]){ 
            bcrypt.compare( password, sql[0][0].password, (error,resultado)=>{
            if(error) throw error;
            if(resultado){ res.status(200).json({message:"User login successfully"})}
            else {res.status(401).json({message: "The password is invalid"})}
            }
          ) 
        }

    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
    };

module.exports = {loginUser};



