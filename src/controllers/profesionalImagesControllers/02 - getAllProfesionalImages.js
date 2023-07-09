const { ProfesionalImagesPost } = require('../../db');

const getAllProfesionalImages = async () => {

  const profesionalImages = await ProfesionalImagesPost.findAll({where:{
    view: true,
  }});

  if(profesionalImages.length === 0) throw Error (`No hay posts de images a mostrar`);

  return profesionalImages;
};

module.exports = getAllProfesionalImages;