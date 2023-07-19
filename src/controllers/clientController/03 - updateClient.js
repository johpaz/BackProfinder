const { Client } = require("../../db");
const { Country } = require('../../db');
const { Location } = require('../../db');
const { Op } = require('sequelize');
const { getImageUrl } = require('../../firebase');

const updateClient = async (id, name, email, password, image, genre, description, phone,
    CountryId, LocationId) => {
    let imageUrl = null
    if (image) {
        imageUrl = image[0]
    }

    const clientInBDD = await Client.findByPk(id);
    // console.log(clientInBDD);

    if (!clientInBDD) throw Error(`No existe el cliente de id: ${id}`);

    // Match ocupations


    // const imageUrl = await getImageUrl(image);
    // const domain = "https://firebasestorage.googleapis.com";

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
        image: clientInBDD.image,
        genre: clientInBDD.genre,
        description: clientInBDD.description,
        phone: clientInBDD.phone,
        country: countryBDD.name,
        location: locationBDD.name,
    };
};

module.exports = updateClient// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8