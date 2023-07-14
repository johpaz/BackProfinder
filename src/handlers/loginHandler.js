
const bcrypt= require("bcrypt");
//const {sequelize}= require("sequelize")
const {sequelize} = require("../db");

 const loginUser=async (req,res) =>{
    const {usuario,email,password}= req.body;
    const sql= await sequelize.query(`SELECT * FROM "Users" where email= '${email}'`);
  
    //try {
        if (!sql[0].length){res.status(400).json({message:"El email no ha sido encontrado"})};

        if (sql[0][0]){ 
            bcrypt.compare( password, sql[0][0].password, (error,resultado)=>{
            if(error) throw error;
            if(resultado){ 
                typeUser();
                if(!res.status(200)) {res.status(200).json({
                usuario:usuario,
                email:email,
                password:password,
                message:"Usuario logueado satisfactoriamente"})
            }}
            else {res.status(401).json({message: "La contraseña es inválida"})}
            }
          ) 
        }

      const  typeUser= async()=>{ switch (usuario) {
            case 'c':
                console.log("soy c")

                const loginClient= await sequelize.query(`SELECT * FROM "Clients" WHERE "email"= '${email}'`);

                console.log(loginClient[0][0])


               if (loginClient[0][0]==undefined) {
                
               
                res.status(200).json({
                usuario:usuario,
                email:email,
                password:password,
                message:"No pertenece al tipo de usuario seleccionado"})    ;break; }

                else{res.status(200).json({
                    usuario:usuario,
                    email:email,
                    password:password,
                    message:"Usuario logueado satisfactoriamente"})   ;break;}

             
            case 'p':
                console.log("soy p")

                const loginProf= await sequelize.query(`SELECT * FROM "Profesionals" WHERE "email"= '${email}'`);

                console.log(loginProf[0][0])

                if (loginProf[0][0]==undefined){ res.status(200).json({
                    usuario:usuario,
                    email:email,
                    password:password,
                    message:"No pertenece al tipo de usuario seleccionado"})  ; break;}

else{res.status(200).json({
    usuario:usuario,
    email:email,
    password:password,
    message:"Usuario logueado satisfactoriamente"}); break;}
               
            case 'a':
                console.log ("soy a")

                break;
            default:
                break;
        }


    // } catch (error) {
    //     res.status(400).json({error: error.message}) 
    }}
    ; 

module.exports = {loginUser};


