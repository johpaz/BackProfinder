const { PostProfesional } = require("..//..//db")
const { Category } = require('../../db');
const { Ocupation } = require('../../db');
const { getImageUrl } = require('..//../firebase');
const { Op } = require('sequelize');

const updatePostProfesional = async (id, title, image, content, ProfesionalId,  categories, ocupations) => {
  console.log("--image en el controller--");
  console.log(id,image,title,content,ProfesionalId,categories,ocupations)
   const profesionalPostInBDD = await PostProfesional.findByPk(id, {
    include: [
      {
        model: Category,
        attributes: ["id", "name"],
       
      },
      {
        model: Ocupation,
        attributes: ["id", "name", "CategoryId"],
       
      }
    ]
  });

  if (!profesionalPostInBDD) throw Error(`No existe el post del profesional de id: ${id}`);

  // Match ocupations

  const ocupationsFormat = ocupations.map(async (ocupationName) => {
    const ocupationsInBDD = await Ocupation.findOne({ where: { name: ocupationName } });
    if (!ocupationsInBDD) throw Error(`No existe la ocupación llamada: ${ocupationName} en la base de datos`);
    return {
      id: ocupationsInBDD.id,
      name: ocupationsInBDD.name,
      categoryId: ocupationsInBDD.CategoryId,
    };
  });

  const resolvedOcupations = await Promise.all(ocupationsFormat);

  // Match categories
  const categoriesFormat = categories.map(async (categoryName) => {
    const categoriesInBDD = await Category.findOne({ where: { name: categoryName } });
    if (!categoriesInBDD) throw Error(`Las categorías ${categoryName} no existen en la base de datos`);

    const categoryOcupations = resolvedOcupations.filter((ocupation) => ocupation.categoryId === categoriesInBDD.id);

    return {
      id: categoriesInBDD.id,
      name: categoriesInBDD.name,
      ocupations: categoryOcupations.map((ocupation) => ({ id: ocupation.id, name: ocupation.name }))
    };
  });
  const resolvedCategories = await Promise.all(categoriesFormat);

  // const imageUrl = await getImageUrl(image);
  // const domain = "https://firebasestorage.googleapis.com";

  // Update postProfesional

  profesionalPostInBDD.title = title  || profesionalPostInBDD.title;
  profesionalPostInBDD.image = image || profesionalPostInBDD.image;
  profesionalPostInBDD.content = content !== undefined ? content : profesionalPostInBDD.content;
  profesionalPostInBDD.ProfesionalId = ProfesionalId || profesionalPostInBDD.ProfesionalId;
  await profesionalPostInBDD.save();

  // Set associations

  console.log(profesionalPostInBDD);
  const categoriesBDD = await Category.findAll({
    where: {
      name: {
        [Op.in]: resolvedCategories.map((category) => category.name)
      }
    }
  });

  const ocupationsBDD = await Ocupation.findAll({
    where: {
      name: {
        [Op.in]: resolvedOcupations.map((ocupation) => ocupation.name)
      }
    }
  });

  await profesionalPostInBDD.setCategories(categoriesBDD);
  await profesionalPostInBDD.setOcupations(ocupationsBDD);
  console.log(profesionalPostInBDD);
  return {
    id: profesionalPostInBDD.id,
    title: profesionalPostInBDD.title,
    image: profesionalPostInBDD.image,
    content: profesionalPostInBDD.content,
    ProfesionalId: profesionalPostInBDD.ProfesionalId,
    categories: profesionalPostInBDD.categories,
    ocupations: profesionalPostInBDD.ocupations
  };
};

module.exports = updatePostProfesional;
