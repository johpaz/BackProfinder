const { Profesional } = require('../../db');
const { Category } = require('../../db');
const { Ocupation } = require('../../db');
const { Country } = require('../../db');
const { Location } = require('../../db');
const { Op } = require('sequelize');

const putProfileProfesional = async(id,name, email,image, genre, years_exp,phone, CountryId, LocationId) => {

  console.log(id) // bien
  console.log(name) // bien
  console.log(email) // 
  console.log(image)
  console.log("genero",genre)
  // console.log(years_exp)
  // console.log(categories)
  // console.log(ocupations)
  console.log("telefono",phone)
  console.log("pais",CountryId)
  console.log("ciudad",LocationId)

  const profesionalInBDD = await Profesional.findByPk(id);

  if(!profesionalInBDD) throw Error(`No existe el profesional de id: ${id}`);

  //   // Match ocupations

  //   const ocupationsFormat = ocupations.map(async (ocupationName) => {
  //     const ocupationsInBDD = await Ocupation.findOne({ where: { name: ocupationName } });
  //     if (!ocupationsInBDD) throw Error(`No existe la ocupación llamada: ${ocupationName} en la base de datos`);
  //     return {
  //       id: ocupationsInBDD.id,
  //       name: ocupationsInBDD.name,
  //       categoryId: ocupationsInBDD.CategoryId,
  //     };
  //   });

  // const resolvedOcupations = await Promise.all(ocupationsFormat);

  // // Match categories
  // const categoriesFormat = categories.map(async (categoryName) => {
  //   const categoriesInBDD = await Category.findOne({ where: { name: categoryName } });
  //   if (!categoriesInBDD) throw Error(`Las categorías ${categoryName} no existen en la base de datos`);

  //   const categoryOcupations = resolvedOcupations.filter((ocupation) => ocupation.categoryId === categoriesInBDD.id);

  //   return {
  //     id: categoriesInBDD.id,
  //     name: categoriesInBDD.name,
  //     ocupations: categoryOcupations.map((ocupation) => ({ id: ocupation.id, name: ocupation.name }))
  //   };
  // });

  // const resolvedCategories = await Promise.all(categoriesFormat);

 
  profesionalInBDD.name = name || profesionalInBDD.name;
  profesionalInBDD.email = email || profesionalInBDD.email;
  profesionalInBDD.image = image && image.length > 0 ? image[0] : profesionalInBDD.image;
  profesionalInBDD.genre = genre || profesionalInBDD.genre;
  profesionalInBDD.years_exp = years_exp || profesionalInBDD.years_exp;
  profesionalInBDD.phone = phone || profesionalInBDD.phone;
  profesionalInBDD.CountryId = CountryId || profesionalInBDD.CountryId;
  profesionalInBDD.LocationId = LocationId || profesionalInBDD.LocationId;

  if (LocationId) {
    const locationInBDD = await Location.findByPk(LocationId);
    if (!locationInBDD) throw Error(`No existe la ubicación con ID: ${LocationId} en la base de datos`);
    profesionalInBDD.geolocation = [locationInBDD.latitude, locationInBDD.longitude];
  }

  await profesionalInBDD.save();

  // // Asignar asociaciones solo si los valores son válidos
  // const categoriesBDD = await Category.findAll({
  //   where: {
  //     name: { [Op.in]: resolvedCategories.map((category) => category.name) },
  //   },
  // });
  // await profesionalInBDD.setCategories(categoriesBDD);

  // const ocupationsBDD = await Ocupation.findAll({
  //   where: {
  //     name: { [Op.in]: resolvedOcupations.map((ocupation) => ocupation.name) },
  //   },
  // });
  // await profesionalInBDD.setOcupations(ocupationsBDD);

  const countryBDD = await Country.findByPk(CountryId);
  await profesionalInBDD.setCountry(countryBDD.id);

  await profesionalInBDD.setLocation(LocationId);

  return profesionalInBDD;
};

module.exports = putProfileProfesional;