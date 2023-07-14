const { Client } = require("../../db.js");

// Lógica para actualizar un usuario por su ID
const updateClient = async (clientInfo, id) => {
    const user = await Client.findByPk(id);

    if (!user) {
        throw Error('Usuario no encontrado');
    }

    // Actualiza los datos del usuario
    user.name = clientInfo.name;
    user.image = clientInfo.image;
    user.phone = clientInfo.phone;
    user.genre = clientInfo.genre;
    user.description = clientInfo.description;
    user.ubication = clientInfo.ubication;

    //Guarda los cambios en la base de datos
    await user.save();
    return user
}

module.exports = updateClient// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8