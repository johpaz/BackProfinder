const validateName = (name) => {

    if (typeof name !== "string") {
        throw Error("El nombre debe ser un string")
    }
    let regexSpecialCharacters = /^[a-zA-Z_ ]*$/
    if (!regexSpecialCharacters.test(name)) {
        throw Error("El nombre no puede contener caracteres especiales.")
    };
    if (name.length > 50) {
        throw Error("El nombre contiene muchos caracteres.")
    };
    // let firstAndLastName = name.split(" ");
    // if (firstAndLastName.length !== 2) {
    //     throw Error("La propiedad name debe contener nombre y apellido.")
    // }
}



const validatePhone = (phone) => {

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
    if (typeof genre !== "string") {
        throw Error("El tipo de dato de genre debe ser un string")
    };
    const genres = ["male", "female"]
    if (!genres.includes(genre)) {
        throw Error("Eliga un genero correcto.")
    };
};

const validateDescription = (description) => {
    if (typeof description !== "string") {
        throw Error("El tipo de dato de description debe ser un string.")
    }
    if (description.length > 150) {
        throw Error("La descripcion no puede contar con mas de 150 caracteres.")
    };
};

const validateUbication = (ubication) => {
    if (typeof ubication !== "string") {
        throw Error("El tipo de dato de ubication debe ser un string.");
    };
};

const validateImage = (image) => {

    const regexImage = /(https?:\/\/.*\.(?:jpg|jpeg|gif|png|svg))/i
    if (!regexImage.test(image)) {
        throw Error("La imagen debe ser una url y debe tener formato jpg|jpeg|gif|png|svg ")
    }

};

module.exports = (req, res, next) => {
    const { name, phone, image, genre, description, ubication } = req.body;
    try {
        validateName(name)
        validatePhone(phone)
        validateImage(image)
        validateGenre(genre)
        validateDescription(description)
        validateUbication(ubication)
    } catch (error) {
        return res.status(400).json(error.message);
    }
    next();

}