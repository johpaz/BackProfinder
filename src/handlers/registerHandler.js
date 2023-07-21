const bcrypt = require("bcrypt");

const { sequelize } = require("../db");
const sendEmail = require("../configs/nodemailer/sendEmailConfirmation");
const { admin } = require("googleapis/build/src/apis/admin");


const userRegister = async (req, res) => {
    const { usuario, name, email, password } = req.body;

    bcrypt.hash(password, 8, async (error, hash) => {
        if (error) { res.status(400).json({ error: error.message }) };

        try {
            const sql = await sequelize.query(`INSERT INTO "Users" (usuario,name,email,password) VALUES ('${usuario}','${name}','${email}','${hash}')`);

            if (sql.length !== 0) {
                switch (usuario) {
                    case 'c':
                        const newClient = await sequelize.query(`INSERT INTO "Clients" (name,email) VALUES ('${name}','${email}')`);

                        const registerClient = await sequelize.query(`SELECT * FROM "Clients" WHERE "email"= '${email}'`);

                        {
                            res.status(200).json({
                                id: registerClient[0][0].id,
                                name: name,
                                usuario: usuario,
                                email: email,
                                password: password,
                                message: "El cliente se ha registrado exitosamente"
                            })
                        }

                        break;



                    case 'p':
                        const newProf = await sequelize.query(`INSERT INTO "Profesionals" (name,email) VALUES ('${name}','${email}')`);

                        const registerProf = await sequelize.query(`SELECT * FROM "Profesionals" WHERE "email"= '${email}'`);

                        {
                            res.status(200).json({
                                id: registerProf[0][0].id,
                                name: name,
                                usuario: usuario,
                                email: email,
                                password: password,
                                message: "El profesional se ha registrado exitosamente"
                            })
                        }


                        break;

                    case 'a':
                        const adminis = await sequelize.query(`SELECT * FROM "Users" WHERE "email"= '${email}'`);

            
                            res.status(200).json({
                                id: adminis[0][0].id,
                                name: name,
                                usuario: usuario,
                                email: email,
                                password: password,
                                message: "El administrador se ha registrado exitosamente"
                            })
                        

                        break;

                    default:
                        break;
                }
            }

        } catch (error) {
            res.status(400).json({ error: error.message })
        };
    })
};





const updatePassword=async(email, password)=>{


    bcrypt.hash(password, 8, async (error, hash) => {
        if (error) { res.status(400).json({ error: error.message }) };

    const user = await sequelize.query(`UPDATE "Users" SET password= '${hash}'WHERE "email"= '${email}'`)
    console.log(user)
    return user
})}

const changePasswordRegister= async (req, res) => {
    const { email, password} = req.body;

    try {
        const changePassword = await updatePassword(email, password);
        console.log (changePassword)
        return res.status(200).json({message: 'La contraseña ha sido cambiada exitosamente'});
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }


}




module.exports = { userRegister ,changePasswordRegister};