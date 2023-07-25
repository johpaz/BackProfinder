const { Profesional } = require('../../db');
const { Category } = require('../../db');
const { Ocupation } = require('../../db');
const { Country } = require('../../db');
const { Location } = require('../../db');
// const { getImageUrl } = require('../../firebase'); //Ya no se usa post profesional

const createProfesional = async (name,email,password,image,genre,years_exp,categories, ocupations, phone, ubication, CountryId, LocationId) => {

  //! Que coicidan las ocupations con las existentes en la base de datos:
  const ocupationsFormat = ocupations.map(async(ocupationName)=>{
    // console.log(ocupationName) // Docente Doctor cardiovascular Docente primaria
    const ocupationsInBDD = await Ocupation.findOne({where:{name:ocupationName}});
    // console.log(ocupationsInBDD.dataValues);
    if(!ocupationsInBDD) throw Error (`No existe la ocupación llamada: ${ocupationName} en la base de datos`);
    return {
      name: ocupationsInBDD.name,
      categoryId: ocupationsInBDD.CategoryId,
    };
  });

  const resolvedOcupations = await Promise.all(ocupationsFormat);
  // console.log(resolvedOcupations);

  //! Que coincidan categories query con las existentes en la base de datos: 
  // Categories será un array de strings -> ["Educación","Ingenieria"]
  const categoriesFormat = categories.map(async(categoryName)=>{
  // console.log(categoryName) ////? Educación Ingenieria
  const categoriesInBDD = await Category.findOne({where:{name: categoryName}});
  // console.log(categoriesInBDD.dataValues);
  if(!categoriesInBDD) throw Error (`Las categorías ${categoryName} no existen en la base de datos`);

  const categoryOcupations = resolvedOcupations.filter((ocupation) => ocupation.categoryId === categoriesInBDD.id);

    return {
      name: categoriesInBDD.name,
      ocupations: categoryOcupations.map((ocupation)=>({name: ocupation.name}))
    };
  });

  const resolvedCategories = await Promise.all(categoriesFormat);
  // console.log(resolvedCategories.map((category)=>category.name))
  // console.log(resolvedCategories.map((category)=> category.ocupations.map((ocupation)=>ocupation.name)));
  //! Que coincidan los id del país y location en la base de datos
  const CountryId = country.id;
  const country = await Country.findByPk(CountryId);
  
  const location = await Location.findByPk(LocationId);
  if (!location) {
    throw new Error(`La ubicación con el ID ${LocationId} no existe en la base de datos`);
  }
  const LocationId = location.id;
  const latitude = location.latitude;
  const longitude = location.longitude;

  const profesionalFormat = { 
    name,
    email,
    password: password,
    // image: imageUrl,
    image,
    genre, 
    years_exp,
    phone, 
    lat: latitude,
    lon: longitude,
    // ubication,
    active: true,
    pro: true
  };

  const newProfesional = await Profesional.create(profesionalFormat); //Creo el profesional

  //? Relación del profesional con la categoría
  const categoriesBDD = await Category.findAll({where:{name: resolvedCategories.map((category)=>category.name)}});
  // const categoriesBDD = resolvedCategories.map((category)=>category.name);
  await newProfesional.addCategories(categoriesBDD);
  //? Relación del profesional con la ocupación

  const ocupationsBDD = await Ocupation.findAll({where:{name:resolvedOcupations.map((ocupation)=>ocupation.name)}});
  await newProfesional.addOcupations(ocupationsBDD);
  await newProfesional.setCountry(country.id);
  await newProfesional.setLocation(location.id);

  await Profesional.update(
    { lat: latitude, lon: longitude },
    { where: { id: newProfesional.id } }
  );

console.log(newProfesional);
  return {
    id: newProfesional.id,
    name: newProfesional.name,
    email: newProfesional.email,
    image: newProfesional.image,
    password: newProfesional.password,
    genre: newProfesional.genre,
    years_exp: newProfesional.years_exp,
    phone:newProfesional.phone,
    // ubication: newProfesional.ubication,
    country:country.name,
    location: location.name,
    latitude: newProfesional.lat, 
    longitude: newProfesional.lon, 
    categories: resolvedCategories
  };
};

module.exports = createProfesional;// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8