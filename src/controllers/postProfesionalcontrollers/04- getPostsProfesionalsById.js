const { PostProfesional } = require('../../db');

const getPostProfesionalById = async (id) => {
  if(!id) throw Error (`El id es obligatorio`);
   const postProfesional = await PostProfesional.findByPk(id);
  if(!postProfesional) throw Error(`No existe el post de id: ${id}`)

  return postProfesional;
};

module.exports = getPostProfesionalById