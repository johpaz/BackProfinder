const bcrypt= require("bcrypt");

const {sequelize} = require("../db");


const userRegister= async (req,res)=>{
    const {usuario,name,email,password}= req.body;

    bcrypt.hash(password, 8, async (error, hash)=>{

       if (error) {res.status(400).json({error: error.message})};

       try {
        const sql= await sequelize.query(`INSERT INTO "Users" (usuario,name,email,password) VALUES ('${usuario}','${name}','${email}','${hash}')`);

        if(sql.length!==0){

            switch (usuario) {
                case 'c':
                    console.log("soy c")

                    const newClient= await sequelize.query(`INSERT INTO "Clients" (name,email) VALUES ('${name}','${email}')`);

                    console.log(newClient)

                    // if (newClient[0][0]===undefined) res.status(200).json({
                    //     usuario:usuario,
                    //     email:email,
                    //     password:password,
                    //     message:"No pertenece al tipo de usuario seleccionado"})

                    break;
                case 'p':
                    console.log("soy p")

                 const newProf= await sequelize.query(`INSERT INTO "Profesionals" (name,email) VALUES ('${name}','${email}')`);

                    break;
                case 'a':
                    console.log ("soy a")

                    break;
                default:
                    break;
            }



            {res.status(200).json({
                name:name,
                usuario:usuario,
                email:email,
                password:password,
                message:"El usuario se ha registrado exitosamente"})}
           
            //res.status(200).json({message:  req.flash('info')});
        
        
        }
        
        
        

        
       } catch (error) {
        res.status(400).json({error: error.message});
       };
    })
    };

module.exports = {userRegister};