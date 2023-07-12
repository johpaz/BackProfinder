const { Client } = require("../../db.js");
const { Profesional } = require('../../db.js');

const validateName = (name) => {
    // console.log(name.split(" "));
    if (!name) {
        throw Error("La propiedad name no puede estar vacia.")
    };
    if (typeof name !== "string") {
        throw Error("El nombre debe ser un string.")
    }
    let regexSpecialCharacters = /^[a-zA-Z_ ]*$/
    if (!regexSpecialCharacters.test(name)) {
        throw Error("El nombre no puede contener caracteres especiales.")
    };
    if (name.length > 50) {
        throw Error("El nombre contiene muchos caracteres.")
    };
    let firstAndLastName = name.split(" ");
    if (firstAndLastName.length !== 2) {
        throw Error("La propiedad name debe contener nombre y apellido.")
    }
}

const validateEmail = (email) => {
    if (!email) {
        throw Error("Por favor ingrese un email")
    };
    if (typeof email !== "string") {
        throw Error("El nombre debe ser un string.")
    };
    const emailRegexEnd = /^[a-zA-ZñÑ\s]+$/;
    const emailEnd = email.split(".")[1];
    let regexEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    if (!regexEmail.test(email)) {
        throw Error("Ingrese un email valido, Ej : usuario@gmail.com");
    }
    if (!emailRegexEnd.test(emailEnd)) {
        throw Error("El email al final del dominio no puede contener numeros");
    };


};

const validateImage = (image) => {
    // if (!image) {
    //     throw Error("Por favor ingrese la url de una imagen.");
    // }
    if (typeof image !== "string") {
        throw Error("El nombre debe ser un string.")
    }
    const regexImage = /(https?:\/\/.*\.(?:jpg|jpeg|gif|png|svg))/i
    if (!regexImage.test(image)) {
        throw Error("La imagen debe ser una url y debe tener formato jpg|jpeg|gif|png|svg ")
    }

};
// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8
const validatePhone = (phone) => {
    // if (!phone) {
    //     throw Error("La propiedad phone no puede estar vacia");
    // };
    if (typeof phone !== "string") {
        throw Error("El tipo de dato de phone debe ser un string.")
    };
    if (phone.length !== 10) {
        throw Error("El telefono solo debe contar con 10 numeros.")
    }
    const regexPhone = /^[0-9]*$/

    if (!regexPhone.test(phone)) {
        throw Error("El telefono solo puede contener numeros.")
    };
};

const validateGenre = (genre) => {
    // if (!genre) {
    //     throw Error("La propiedad genre no puede estar vacia.")
    // };
    if (typeof genre !== "string") {
        throw Error("El tipo de dato de genre debe ser un string")
    };
    const genres = ["Male", "Female"]
    if (!genres.includes(genre)) {
        throw Error("Eliga un genero correcto.")
    };
};

const validateDescription = (description) => {
    // if (!description) {
    //     throw Error("La propiedad description no puede estar vacia.")
    // };
    if (typeof description !== "string") {
        throw Error("El tipo de dato de description debe ser un string.")
    }
    if (description.length > 150) {
        throw Error("La descripcion no puede contar con mas de 150 caracteres.")
    };
};

const validateUbication = (ubication) => {
    // if (!ubication) {
    //     throw Error("La propiedad ubication no puede estar vacia.");
    // }
    if (typeof ubication !== "string") {
        throw Error("El tipo de dato de ubication debe ser un string.");
    };
};

module.exports = async (req, res, next) => {
    const { name, email, phone, image, genre, description, ubication } = req.body
    try {

        const matchEmail = await Client.findOne({ where: { email: email } });
        if (matchEmail) throw Error(`Ya existe un cliente asociado con el email de ${email}`);

        const profesionalEmail = await Profesional.findOne({where:{email:email}});
        if(profesionalEmail) throw Error(`El correo: ${email} está asociado a un cliente`);
    
        validateName(name);
        validateEmail(email);
        validatePhone(phone);
        validateImage(image);
        validateGenre(genre);
        validateDescription(description);
        validateUbication(ubication);

    } catch (error) {
        return res.status(400).json(error.message)
    }





    next()

};