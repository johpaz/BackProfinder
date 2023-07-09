const { Profesional } = require('../../db');

const validateName = (name) => {
  if(!name) throw Error(`La propiedad name es obligatoria`);
  if(typeof name !== "string") throw Error(`El tipo de dato de name debe ser un string`);

  const namevalidated = /^[a-zA-ZñÑ\s]+$/.test(name.trim());
  const firstNameLastName = name.split(" ");
  
  if(name.trim() === "") throw Error(`El nombre no puede estar vacío`);
  if(/\d/.test(name)) throw Error(`El nombre no puede contener números`);
  if(!namevalidated) throw Error(`El nombre no puede contener expresiones especiales o símbolos`);
  if(firstNameLastName.length < 1) throw Error('El nombre de usuario debe estar conformado por nombre y apellido');
};

const validateEmail = (email) => {
  if(!email) throw Error(`La propiedad email es obligatoria`);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailRegexEnd = /^[a-zA-ZñÑ\s]+$/;
  const emailEnd = email.split(".")[1];
  if(typeof email !== "string") throw Error(`El tipo de dato de email debe ser un string`);
  if(email.trim() === "") throw Error(`El email no puede ser un string`);
  if(!emailRegex.test(email)) throw Error (`El email debe tener un formato de email - ejemplo: usuario@gmail.com`);
  if(!emailRegexEnd.test(emailEnd)) throw Error(`El email no puede tener números o símbolos luego del dominio`)
};
 
const validateImage = (image) => {
  if(!image) throw Error(`La propiedad image es obligatoria`);
  // // console.log(image)  //https://example.com/profile.jpg
  // const imageEnd = image.split(".")[1].split("/")[0]
  // // console.log(imageEnd) // com
  // const imageL = image.split(".")[1].split("/")
  // console.log(imageL) //profile
  if(typeof image !== "string") throw Error(`El tipo de dato de image debe ser un string`);
  const imageRegexUrl = /^(http(s?):\/\/)?[^\s/$.?#].[^\s]*\.(?:jpg|jpeg|gif|png)$/i
  if(image.trim() === "") throw Error(`La imagen no puede ser un string vacío`)
  if(!imageRegexUrl.test(image)) throw Error (`La imagen debe ser una url y tener formato de imagen: .jpg|.jeg|.png`); 
};

const validateGenre = (genre) => {
  if(!genre) throw Error(`La propiedad genre es obligatoria`);
  const genrevalidated = /^[a-zA-ZñÑ\s]+$/.test(genre.trim());
  if(typeof genre !== "string") throw Error(`El tipo de dato de genre debe ser un string`);
  if(genre.trim() === "") throw Error(`El género no puede estar vacío`);
  if(!genrevalidated) throw Error(`El género no puede contener caracteres especiales como números o símbolos`);
};

const validateYearsExp = (years_exp) => {
  if(!years_exp) throw Error(`La propiedad years_exp es obligatoria`);
  if(typeof years_exp !== "string") throw Error (`El tipo de dato de los años de experiencia debe ser un string`);
};

const validateDescription = (description) => {
  if(!description) throw Error(`La propiedad description es obligatoria`);
  if(typeof description !== "string") throw Error(`El tipo de dato de la descripción debe ser un string`);
  if(description.length > 250) throw Error(`La descripción no puede tener más de 250 caracteres`);
};

const validateCategories = (categories) => {
  if(!categories) throw Error(`La propiedad categories es obligatoria`);
  if(!Array.isArray(categories)) throw Error(`El tipo de dato de categories debe ser un array`);
  if(categories.length === 0) throw Error (`El profesional debe tener al menos una categoría`);
  if(categories.length > 0 && categories.length > 3) throw Error(`El profesional no puede tener más de 3 categorías`);
};

const validateOcupations = (ocupations) => {
  if(!ocupations) throw Error(`La propiedad ocupations es obligatoria`);
  if(!Array.isArray(ocupations)) throw Error(`El tipo de dato de ocupations debe ser un array`);
  if(ocupations.length === 0) throw Error(`El profesional debe tener al menos una ocupación`);
  if(ocupations.length > 0 && ocupations.length > 5) throw Error(`El profesional no puede tener más de 5 ocupaciones`);
};

// const validatePhone = (phone) => {
//   if(!phone) throw Error(`La propiedad phone es obligatoria`);
//   if(typeof phone !== "string") throw Error(`El tipo de dato de phone debe ser un string`);
//   if(phone.length !== 10) throw Error(`La cantidad de caracteres de la propiedad phone debe ser de 10`);
//   if(!/^\d+$/.test(phone)) throw Error(`La propiedad phone solo debe contener números`)
// };

const validateUbication = (ubication) => {
  if(!ubication) throw Error('La propiedad ubication es obligatoria');
};

module.exports = async (req,res,next) => {

  const { name, email, image, genre, years_exp, description ,categories, ocupations, phone, ubication } = req.body;

  try {

    const matchEmail = await Profesional.findOne({where:{email: email}});
    if(matchEmail) throw Error(`El correo: ${email} ya está asociado con un profesional`);

    validateName(name);
    validateEmail(email);
    validateImage(image);
    validateGenre(genre);
    validateYearsExp(years_exp);
    validateDescription(description);
    validateCategories(categories);
    validateOcupations(ocupations);
    // validatePhone(phone);
    validateUbication(ubication);
    next();
  } catch (error) {
    return res.status(400).json({error: error.message});
  };
};