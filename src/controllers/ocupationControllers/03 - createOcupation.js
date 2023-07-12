const { Ocupation } = require('../../db');

const createOcupation = async (name,categoryId) => {
  console.log(name)

  const nameOcupationFormat = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  const newOcupation = await Ocupation.create({ name: nameOcupationFormat });
  await newOcupation.setCategory(categoryId);

  if(!newOcupation) throw Error (`No se pudo crear una ocupación`);
  return newOcupation;
};

module.exports = createOcupation;// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8