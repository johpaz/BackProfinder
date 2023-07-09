const { ProfesionalImagesPost } = require('../../db');

const getProfesionalImageById = async (id) => {
  if(!id) throw Error (`El id es obligatorio`);
  if(!isNaN(id)) throw Error (`El id es de formato uuid`);

  const profesionalImage = await ProfesionalImagesPost.findByPk(id,{where:{view: true}});
  if(!profesionalImage) throw Error(`No existe el post de id: ${id}`)

  return profesionalImage;
};

module.exports = getProfesionalImageById;