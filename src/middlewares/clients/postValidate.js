const { Client } = require("../../db.js");

let regexSpecialCharacters = /^[a-zA-Z_ ]*$/
let regexEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/

module.exports = async (req, res, next) => {
    const { name, email, image, genre, description } = req.body

    const matchEmail = await Client.findOne({ where: { email: email } });
    if (matchEmail) {
        return res.status(404).json({ error: `Ya existe ese email` });
    }

    if (!name || !regexSpecialCharacters.test(name)) {
        return res.status(400).json({ error: 'La propiedad name no puede estar vacia o contener caracteres especiales o numericos' });
    };

    if (!email || !regexEmail.test(email)) {
        return res.status(400).json({ error: 'Tiene que ser un email valido' });
    };

    if (!image) {
        return res.status(400).json({ error: 'Falta la propiedad image' });
    };

    if (!genre) {
        return res.status(400).json({ error: 'Falta la propiedad genre' });
    };

    if (!description) {
        return res.status(400).json({ error: 'Falta la propiedad description' });
    };

    next()

};