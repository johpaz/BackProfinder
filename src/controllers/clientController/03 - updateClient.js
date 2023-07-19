const { Client } = require("../../db");
const { Country } = require('../../db');
const { Location } = require('../../db');
const { Op } = require('sequelize');
const { getImageUrl } = require('../../firebase');

// Lógica para actualizar un usuario por su ID
//  = async (clientInfo, id) => {

//     const user = await Client.findByPk(id);

//     if (!user) {
//         throw Error('Usuario no encontrado');
//     }

//     // Actualiza los datos del usuario
//     user.name = clientInfo.name || user.name;
//     user.email = clientInfo.email || user.email;
//     user.password = clientInfo.password || user.password;
//     user.image = clientInfo.image || user.image;
//     user.phone = clientInfo.phone || user.phone;
//     user.genre = clientInfo.genre || user.genre
//     user.description = clientInfo.description || user.description;
//     user.ubication = clientInfo.ubication || user.ubication;

//     //Guarda los cambios en la base de datos
//     await user.save();
//     return user
// 
const updateClient = async (id, name, email, password, image, genre, description, phone, CountryId, LocationId) => {


    const clientInBDD = await Client.findByPk(id);
    console.log(clientInBDD);

    if (!clientInBDD) throw Error(`No existe el cliente de id: ${id}`);

    // Match ocupations


    const imageUrl = await getImageUrl(image);
    const domain = "https://firebasestorage.googleapis.com";

    // Update profesional

    clientInBDD.name = name || clientInBDD.name;
    clientInBDD.email = email || clientInBDD.email;
    clientInBDD.password = password || clientInBDD.password;
    clientInBDD.image = imageUrl || clientInBDD.image;
    clientInBDD.genre = genre || clientInBDD.genre;
    clientInBDD.description = description || clientInBDD.description;
    clientInBDD.phone = phone || clientInBDD.phone;
    clientInBDD.CountryId = CountryId || clientInBDD.CountryId;
    clientInBDD.LocationId = LocationId || clientInBDD.LocationId;
    await clientInBDD.save();



    const countryBDD = await Country.findByPk(CountryId);
    const locationBDD = await Location.findByPk(LocationId);

    await clientInBDD.setCountry(countryBDD.id);
    await clientInBDD.setLocation(locationBDD.id);

    // Return updated professional

    return {
        id: clientInBDD.id,
        name: clientInBDD.name,
        email: clientInBDD.email,
        image: `${domain}/newAvatar`,
        genre: clientInBDD.genre,
        description: clientInBDD.description,
        phone: clientInBDD.phone,
        // ubication: profesionalInBDD.ubication,
        country: countryBDD.name,
        location: locationBDD.name,
    };
};

module.exports = updateClient// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8