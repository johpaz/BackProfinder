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
                    const newClient= await sequelize.query(`INSERT INTO "Clients" (name,email) VALUES ('${name}','${email}')`);

                    const registerClient= await sequelize.query(`SELECT * FROM "Clients" WHERE "email"= '${email}'`);

                    {res.status(200).json({
                        id: registerClient[0][0].id,
                        name:name,
                        usuario:usuario,
                        email:email,
                        password:password,
                        message:"El usuario se ha registrado exitosamente"})}

                break;



            case 'p':
                const newProf= await sequelize.query(`INSERT INTO "Profesionals" (name,email) VALUES ('${name}','${email}')`);

                const registerProf= await sequelize.query(`SELECT * FROM "Profesionals" WHERE "email"= '${email}'`);

                {res.status(200).json({
                id:  registerProf[0][0].id,
                name:name,
                usuario:usuario,
                email:email,
                password:password,
                message:"El usuario se ha registrado exitosamente"})}
            
            
            break;

            case 'a':
                    console.log ("soy a")

            break;
            
            default:
                break;
            }
        }
        
       } catch (error) {
        res.status(400).json({error: error.message})
       };
    })
};

module.exports = {userRegister};