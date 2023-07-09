const { Category } = require('../../db');

const createCategory = async (name) => {

  const nameCategoryFormat = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  
  const newCategory = await Category.create({name: nameCategoryFormat});

  if(!newCategory || newCategory.length === 0) throw Error (`No se pudo crear la categoría ${nameCategoryFormat}`);

  return newCategory;
};

module.exports = createCategory;

//? petición Front -> middlewares -> handler -> controller (crea,busca) -> bdd