const { Client } = require("../../db.js");

// Lógica para actualizar un usuario por su ID
const updateClient = async (clientInfo, id) => {
    const user = await Client.findByPk(id);

    if (!user) {
        throw Error('Usuario no encontrado');
    }

    // Actualiza los datos del usuario
    user.name = clientInfo.name || user.name;
    user.email = clientInfo.email || user.email;
    user.password = clientInfo.password || user.password;
    user.image = clientInfo.image || user.image;
    user.phone = clientInfo.phone || user.phone;
    user.genre = clientInfo.genre || user.genre
    user.description = clientInfo.description || user.description;
    user.ubication = clientInfo.ubication || user.ubication;

    //Guarda los cambios en la base de datos
    await user.save();
    return user
}

module.exports = updateClient// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8