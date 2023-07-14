const { Client } = require("../../db.js")


const createClient = async (name, email,password, phone) => {

    if (!name || !email || !password || !phone) {
        throw Error("Faltan datos a completar")
    }
    else {
        const newClient = await Client.create({
            name,
            email,
            password,
            phone,
            rating: 0,
            active: true,
            pro: false,
            softDelete: null
        });
        return newClient
    }

};

module.exports = createClient;
// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8