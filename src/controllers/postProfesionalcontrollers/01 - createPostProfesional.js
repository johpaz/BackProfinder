const { PostProfesional } = require("../../db.js")
const { Category } = require('../../db');
const { Ocupation } = require('../../db');




const createPostProfesional = async (title,  image, content, ProfesionalId,categories, ocupations,) => {
  console.log(title,ProfesionalId); 
  
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
  
  const postProfesionalFormat= {
    title,
    image,
    content,
    ProfesionalId
  }; 

  console.log(postProfesionalFormat);
  
  const newPostProfesional = await PostProfesional.create(postProfesionalFormat); //Creo el profesional

  //? Relación del profesional con la categoría
  const categoriesBDD = await Category.findAll({where:{name: resolvedCategories.map((category)=>category.name)}});
  // const categoriesBDD = resolvedCategories.map((category)=>category.name);
  await newPostProfesional.addCategories(categoriesBDD);
  //? Relación del profesional con la ocupación

  const ocupationsBDD = await Ocupation.findAll({where:{name:resolvedOcupations.map((ocupation)=>ocupation.name)}});
  await newPostProfesional.addOcupations(ocupationsBDD);

  if(!newPostProfesional) throw EPostrror (`No se pudo crear el profesional llamado: ${name}`);

  return {
    id: newPostProfesional.id,
    title: newPostProfesional.title,
    content:newPostProfesional.content,
    ProfesionalId: newPostProfesional.ProfesionalId,
    categories: resolvedCategories
  };
    
}; 

module.exports = createPostProfesional// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8