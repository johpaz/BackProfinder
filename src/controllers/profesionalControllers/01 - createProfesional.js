const { Profesional } = require('../../db');
const { Category } = require('../../db');
const { Ocupation } = require('../../db');

const createProfesional = async (name,email,image,genre,years_exp,description,categories, ocupations, phone, ubication) => {

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

  const profesionalFormat = { 
    name,
    email,
    image,
    genre, 
    years_exp,
    description,
    phone, 
    ubication,
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

  if(!newProfesional) throw Error (`No se pudo crear el profesional llamado: ${name}`);

  return {
    id: newProfesional.id,
    name: newProfesional.name,
    email: newProfesional.email,
    genre: newProfesional.genre,
    years_exp: newProfesional.years_exp,
    description: newProfesional.description,
    phone:newProfesional.phone,
    ubication: newProfesional.ubication,
    categories: resolvedCategories
  };
};

module.exports = createProfesional;